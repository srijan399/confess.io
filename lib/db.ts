import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGO_URI!;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

async function connectToDatabase() {
    console.log("Creating new database connection...");
    mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log("Successfully connected to MongoDB");
        return mongoose;
    });
}

export default connectToDatabase;
