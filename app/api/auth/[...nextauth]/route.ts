import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

export const authOption: NextAuthOptions = {

    providers: [

        CredentialsProvider({
            name: 'My website', 
            secret: process.env.NEXTAUTH_SECRET,
            credentials: {
                username: {label: 'Username', type: 'text', placeholder: 'add your username'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req) {

                console.log(credentials)

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

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};

