'use server'

import { User } from "@/models/User"


export const registerUser = async(formData: FormData) => {
  const name = formData.get('name'); 
  const email = formData.get('email'); 
  const password = formData.get('password');

    // Validation for required fields
    if (!name || !email || !password) {
      return { success: false, error: "Name and year are required" };
    }
  
    // Validation for data types
    if (typeof name !== 'string' || typeof email !== 'string'|| typeof password !== 'string') {
      return { success: false, error: "Invalid input data" };
    }
  
}
