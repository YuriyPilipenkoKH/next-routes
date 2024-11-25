'use server'

import connectMongoDb from "@/lib/mongo";
import { User } from "@/models/User"
import {hashSync} from 'bcrypt-ts'
import { revalidatePath } from "next/cache";


export const registerUser = async(formData: FormData) => {
  const name = formData.get('name') as string; 
  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

    // Validation for required fields
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" };
    }
    try {
      await connectMongoDb()
      const existingUser = await User.findOne({email})
      if (existingUser) {
        return { success: false, error: "User already exists" };
      }

      const hashedPassword =  hashSync(password)
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      })

      // Convert Mongoose document to plain object and adjust _id
      const plainUser = newUser.toObject();
      // Convert _id to a string
      plainUser._id = plainUser._id.toString(); 

      revalidatePath('/');
      return { success: true, user: plainUser };

    } catch (error) {
      console.error('Error occured while regestring:', error);
      let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return { success: false, error: errorMessage };
    }

  
}
