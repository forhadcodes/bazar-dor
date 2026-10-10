import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb"; 

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: { 
    enabled: true, 
  },

  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  },

  account: {
    accountLinking: {
      enabled: true,
      // ওঅথ প্রোভাইডারের পাশাপাশি ইমেইল-পাসওয়ার্ডও ট্রাস্টেড লিস্টে রাখা ভালো
      trustedProviders: ["google", "github", "email-password"],
    },
  },
});
