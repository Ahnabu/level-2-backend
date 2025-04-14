import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcryptjs";
const userSchema = new Schema<TUser> ({
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true, default: true },
    role: { type: String, enum: ["admin", "student", "faculty"], required: true },
    status: { type: String, enum: ["in-progress", "blocked"], required: true },
    isDeleted: { type: Boolean, default: false },
    
},{
    timestamps: true
})
userSchema.pre("save", async function (next) {
    // check if password is provided
    if (!this.isModified("password")) {
        return next()
    }
    // hash password
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next()
}
    
);

//post save hook to remove password from the response

userSchema.post("save", function (doc, next) {
    doc.password = '';
    next();
});
export const User= model<TUser>("User",userSchema)