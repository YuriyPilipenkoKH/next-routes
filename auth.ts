import NextAuth, {CredentialsSignin} from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"
import {compare} from 'bcrypt-ts'
import { User } from "@/models/User"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({}),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        },
        password: {
          label: 'Password',
          type: 'string'
        },
      }

    })
  ],
 
})