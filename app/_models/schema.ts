import mongoose from "mongoose";

// Interface for confession
export interface IConfession {
    _id?: string;
    content: string;
    timestamp: Date;
}

// Interface for TypeScript type checking
export interface IRoom {
    _id?: string;
    name: string;
    description: string;
    password: string;
    confessions: IConfession[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Confession Schema
const confessionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Confession content is required"],
        trim: true,
        minlength: [1, "Message must be at least 1 character"],
        maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Room Schema
const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Room name is required"],
            trim: true,
            minlength: [1, "Room name must be at least 1 character"],
            maxlength: [100, "Room name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Room description is required"],
            trim: true,
            minlength: [1, "Description must be at least 1 character"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 4 characters"],
            maxlength: [100, "Password cannot exceed 100 characters"],
        },
        confessions: {
            type: [confessionSchema],
            default: [],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        collection: "rooms",
    }
);

// Create indexes for better performance
roomSchema.index({ name: 1 });
roomSchema.index({ createdAt: -1 });

// Export the model
export const Room =
    mongoose.models.Room || mongoose.model<IRoom>("Room", roomSchema);
