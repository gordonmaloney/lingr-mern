import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    //persistentId: { type: String },
    userIcon: { type: String, default: "😃" },
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    defaultCorPref: { type: String }
});

export default mongoose.model("user", userSchema);