import bcrypt from 'bcryptjs';
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";


const loginUser = async (payload:TLoginUser) => {
    const isUserExists = await User.findOne({id:payload?.id});
    if (!isUserExists) {
        throw new AppError(404, "User not found");
    }
    const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError(400, "User is deleted");
    }
    const isBlocked = isUserExists?.status === "blocked" ? true : false;
    if (isBlocked) {
        throw new AppError(400, "User is blocked");
    }
    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password);
    if (!isPasswordMatched) {
        throw new AppError(400, "Invalid Credentials");
    }
    // Access token generation logic can be added here


}

export const AuthServices = {
    loginUser,
};