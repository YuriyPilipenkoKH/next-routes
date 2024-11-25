'use server'

import { User } from "@/models/User"


export const registerUser = async(formData: FormData) => {
  const name = formData.get('name'); 
  const email = formData.get('email'); 
  const password = formData.get('password');
  
}
