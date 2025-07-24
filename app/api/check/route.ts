import { Room } from "@/app/_models/schema";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

const postHandler = async (req: Request) => {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { roomId, password } = body;

        // Validate required fields
        if (!roomId) {
            return NextResponse.json(
                { error: "Room ID is required" },
                { status: 400 }
            );
        }

        if (!password) {
            return NextResponse.json(
                { error: "Room password is required" },
                { status: 400 }
            );
        }

        // Find the room by ID
        const room = await Room.findById(roomId);

        if (!room) {
            return NextResponse.json(
                { error: "Room not found" },
                { status: 404 }
            );
        }

        // Validate password
        if (room.password !== password) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 403 }
            );
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Error adding confession:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};

export { postHandler as POST };
