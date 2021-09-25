import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
});

export default mongoose.model("user", userSchema);