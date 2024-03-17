"use server"
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/database";
import { handleError } from "../utils";

export async function createUser(user: CreateUserParams) {
    try {
      await connectToDatabase();
  
      const newUser = await User.create(user);
  
      return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
      handleError(error);
    }
  }

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}
export async function updateUser(userId: string, updatedUser: UpdateUserParams) {
    try {
        await connectToDatabase();

        const user = await User.findOneAndUpdate({ clerkId: userId }, updatedUser, { new: true });

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}
export async function deleteUser(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOneAndDelete({ clerkId: userId });

        const deletedUser = await User.findByIdAndDelete(user._id);
        revalidatePath("/");
    
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

export async function updateCredits(userId: string, creditFee: number) {
    try {
      await connectToDatabase();
  
      const updatedUserCredits = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { creditBalance: creditFee }},
        { new: true }
      )
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }