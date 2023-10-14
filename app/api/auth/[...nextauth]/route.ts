import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth"
import {cookies} from 'next/headers'
import type { NextAuthOptions } from "next-auth"
import type { NextApiRequest, NextApiResponse } from "next"


export const authOptions: NextAuthOptions = {
    callbacks: {
      async signIn({user, credentials}){
        return true
      },
      async jwt({token, trigger, session}) {

        if(trigger === 'update') {
           token.accountlevel = session.accountlevel
        }

        return token
      },
      async session({session, token}) {

        return session

      }
    }, 
    //pages: {signIn: '/auth/signin'},
    events: {
      async signIn(message) { /* on successful sign in */ },
      async signOut(message) { /* on signout */ },
      async createUser(message) { /* user created */ },
      async updateUser(message) { /* user updated - e.g. their email was verified */ },
      async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
      async session(message) { /* session is active */ },
     },
    providers: [ 
        CredentialsProvider({
            name: 'My website', 
            secret: process.env.NEXTAUTH_SECRET,
            credentials: {
                username: {label: 'Username', type: 'text', placeholder: 'add your username'},
                password: {label: 'Password', type: 'password'}
            },

            async authorize(credentials, req) {


                /*
                  const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                  })

                  const user = await res.json()
            
                  // If no error and we have user data, return it
                  if (res.ok && user) {
                    return user
                  }
                  // Return null if user data could not be retrieved
                  return null
                */

              return Promise.resolve({name: 'samuele', email: 'samgiam@gmail.com', image: 'urlimage', other_data: 'somedata'})

            }
         }
  
        )
    ]
}









const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

