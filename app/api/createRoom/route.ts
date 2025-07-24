import { NextRequest, NextResponse } from "next/server";
import { Room } from "@/app/_models/schema";
import connectToDatabase from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connectToDatabase();

        // Parse request body
        const body = await request.json();
        const { name, description, password } = body;

        // Validate required fields
        if (!name || !description || !password) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields",
                    message: "Name, description, and password are required",
                },
                { status: 400 }
            );
        }

        // Check if room with the same name already exists
        const existingRoom = await Room.findOne({ name: name.trim() });
        if (existingRoom) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Room already exists",
                    message: "A room with this name already exists",
                },
                { status: 409 }
            );
        }

        // Create new room
        const newRoom = new Room({
            name: name.trim(),
            description: description.trim(),
            password: password,
            confessions: [], // Initialize with empty confessions array
        });

        // Save to database
        const savedRoom = await newRoom.save();

        // Return success response without password
        const roomResponse = {
            _id: savedRoom._id,
            name: savedRoom.name,
            description: savedRoom.description,
            confessions: savedRoom.confessions,
            createdAt: savedRoom.createdAt,
            updatedAt: savedRoom.updatedAt,
        };

        return NextResponse.json(
            {
                success: true,
                message: "Room created successfully",
                room: roomResponse,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating room:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Server error",
                message: "An unexpected error occurred",
            },
            { status: 500 }
        );
    }
}
