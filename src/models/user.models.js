import { Schema, model } from "mongoose"
import { type } from "os"

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
        },
        default: {
            url: "https://placehold.co/200x200",
        }
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullname: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isEailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    emailVerificationTokenExpiry: {
        type: Date
    }
}, { timestamps: true })
   
const UserModel = model("User", userSchema)
export {UserModel}