'use server'
import  {CredentialsSignin} from "next-auth"
import { revalidatePath } from "next/cache";
import { signIn } from "../../auth";
import connectMongoDb from "@/lib/mongo";
import { User } from "@/models/User";


export const loginUser = async(formData: FormData) => {

  const email = formData.get('email') as string; 
  const password = formData.get('password') as string;

      // Validation for required fields
      if ( !email || !password) {
        return { success: false, error: "All fields are required" }
      }

      try {
                // Connect to the database and fetch user data
        await connectMongoDb();
        const user = await User.findOne({ email });
    
        // if (!user) {
        //   return { success: false, error: "User not found" };
        // }  
        const result =  await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email,
          password,
        });

        if (!result ) {
          return { success: false, error: "Invalid login credentials" };
        }
    

        revalidatePath('/dashboard');
        return { success: true, user: {name: user.name}};

      }
      catch (error) {
        const someError = error as CredentialsSignin;
        return { success: false, error: someError.cause } ;
      }
  
      // return { success: true, user: { name: user.name } };
}