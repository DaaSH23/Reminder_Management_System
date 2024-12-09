import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token must be provided."],
            ref: "User"
        },
    },
    {timestamps: true}
);

export default mongoose.model("blacklist", blacklistSchema);