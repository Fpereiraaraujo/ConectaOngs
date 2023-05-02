import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"



export const authOptions= {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    
  },
  callbacks: {
    secret: process.env.NEXTAUTH_SECRET,
    session: async ({token,session}) => {
      if (session?.user && token?.sub) {
        console.log(token)
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);