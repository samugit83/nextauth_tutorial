import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import {VerifyUser} from '@/app/database/dynamo_conn.mjs'
import GoogleProvider from "next-auth/providers/google";

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

              let user = await VerifyUser(credentials?.username, credentials.password)
              return user
              
            }
         }),
         GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
              
              console.log(profile)
              profile.id = 'samuele'
              return profile
            },

        })

    ]
}




const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

