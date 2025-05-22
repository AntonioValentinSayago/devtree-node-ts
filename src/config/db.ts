import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        const url = process.env.CONNECTION_STRING;
        const connection = await mongoose.connect(url)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}