'use server'

import connectMongoDb from "@/lib/mongo";
import { User } from "@/models/User"
import { revalidatePath } from "next/cache";

export const loginUser = async(formData: FormData) => {

  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

      // Validation for required fields
      if ( !email || !password) {
        return { success: false, error: "All fields are required" }
      }
}