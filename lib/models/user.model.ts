import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    onboarded: {type: Boolean, default: false},
    likedThreads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;