import mongoose  from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
}

const userShema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model<IUser>("User", userShema);
export default User;