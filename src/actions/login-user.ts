'use server'


import  {CredentialsSignin} from "next-auth"
import { revalidatePath } from "next/cache";
import { signIn } from "../../auth";


export const loginUser = async(formData: FormData) => {

  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

      // Validation for required fields
      if ( !email || !password) {
        return { success: false, error: "All fields are required" }
      }
      console.log('loginUser is running');
      try {
        await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email,
          password,
        });
      }
      catch (error) {
        const someError = error as CredentialsSignin;
        return { success: false, error: someError.cause } ;
      }
      

      revalidatePath('/dashboard');
      return { success: true, user: {name: ''}};
}