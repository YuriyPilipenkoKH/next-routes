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
      return { success: false, error: "All fields are required" }
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
      const {password:_, _id,  __v, ...plainUser} = newUser.toObject();
      console.log(plainUser );
      

    revalidatePath('/');
    return { success: true, user: plainUser };

      
    } catch (error) {
      console.error('Error occurred while registering:', error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      return { success: false, error: errorMessage }
    }

  
}
