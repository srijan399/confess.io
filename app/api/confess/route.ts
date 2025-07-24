import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Room, IConfession } from "@/app/_models/schema";

// POST: Add a new confession to a room
export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connectToDatabase();

        const body = await request.json();
        const { roomId, content } = body;

        // Validate required fields
        if (!roomId) {
            return NextResponse.json(
                { error: "Room ID is required" },
                { status: 400 }
            );
        }

        if (!content) {
            return NextResponse.json(
                { error: "Confession content is required" },
                { status: 400 }
            );
        }

        // Validate content length
        if (content.trim().length === 0) {
            return NextResponse.json(
                { error: "Confession content cannot be empty" },
                { status: 400 }
            );
        }

        if (content.length > 500) {
            return NextResponse.json(
                { error: "Confession content cannot exceed 500 characters" },
                { status: 400 }
            );
        }

        // Find the room by ID
        const room = await Room.findById(roomId);
        console.log("Found room:", room);

        if (!room) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        // Create new confession object
        const newConfession: IConfession = {
            content: content.trim(),
            timestamp: new Date(),
        };

        // Add confession to the room's confessions array
        room.confessions.push(newConfession);

        await room.save();

        // Get the newly added confession (last item in array)
        const addedConfession = room.confessions[room.confessions.length - 1];

        // Return success response with the confession data
        return NextResponse.json(
            {
                success: true,
                message: "Confession added successfully",
                confession: {
                    id: addedConfession._id,
                    content: addedConfession.content,
                    timestamp: addedConfession.timestamp,
                },
                totalConfessions: room.confessions.length,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding confession:", error);

        if (error instanceof Error) {
            if (error.name === "ValidationError") {
                return NextResponse.json(
                    { error: "Invalid data provided", details: error.message },
                    { status: 400 }
                );
            }

            if (error.name === "CastError") {
                return NextResponse.json(
                    { error: "Invalid room ID format" },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
