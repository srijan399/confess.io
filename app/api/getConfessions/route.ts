import { IConfession, Room } from "@/app/_models/schema";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

const getHandler = async (req: Request) => {
    try {
        // Connect to database
        await connectToDatabase();

        const params = new URL(req.url).searchParams;
        const roomIdFromParams = params.get("roomId");

        // Validate required fields
        if (!roomIdFromParams) {
            return NextResponse.json(
                { error: "Room ID is required" },
                { status: 400 }
            );
        }

        // Find the room by ID
        const room = await Room.findById(roomIdFromParams);

        if (!room) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, room: room },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding confession:", error);

        if (error instanceof Error) {
            if (error.name === "ValidationError") {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
};

export { getHandler as GET };
