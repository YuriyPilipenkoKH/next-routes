'use server'

import connectMongoDb from "@/lib/mongo"
import { User } from "@/models/User"

export const getUsers = async () => {
  try {
    await connectMongoDb()
    const usersList = await User.find()
    return { success: true, usersList: usersList };

  } catch (error) {
    console.error('Error occurred while retrieving users list:', error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return { success: false, error: errorMessage }
  }
}