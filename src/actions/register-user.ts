'use server'

import connectMongoDb from "@/lib/mongo";
import { User } from "@/models/User"
import {hashSync} from 'bcrypt-ts'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export const registerUser = async(formData: FormData) => {
  const name = formData.get('name') as string; 
  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

    // Validation for required fields
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    try {
      await connectMongoDb()
      const existingUser = await User.findOne({email})
      if (existingUser) {
        return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
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

      return NextResponse.json({ success: true, user: plainUser }, { status: 201 });
      revalidatePath('/');
      redirect('/');
      
    } catch (error) {
      console.error('Error occurred while registering:', error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }

  
}
