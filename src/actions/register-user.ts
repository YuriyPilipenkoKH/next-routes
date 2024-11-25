'use server'

import connectMongoDb from "@/lib/mongo";
import { User } from "@/models/User"
import {hashSync} from 'bcrypt-ts'


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

      const hashedPassword = await hashSync(password)
      await User.create({
        name,
        email,
        password: hashedPassword
      })
      
    } catch (error) {
      
    }

  
}
