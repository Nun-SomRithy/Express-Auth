import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/default";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true, unique: true
    }, name: {
        type: String, required: true
    }, password: {
        type: String, required: true
    },
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    let user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    user.password = bcrypt.hashSync(user.password, salt);
    return next();

});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}
const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;