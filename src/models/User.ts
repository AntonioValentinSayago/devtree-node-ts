import mongoose  from "mongoose";

interface IUser {
    handle: string,
    name: string;
    email: string;
    password: string;
}

const userShema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model<IUser>("User", userShema);
export default User;