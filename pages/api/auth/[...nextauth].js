import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/Twitter";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { initializeApp, getApp, getApps } from "firebase/app";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import firebase from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABZlrh6RcQBup41XSA9PZeK-6y8dk_crg",
  authDomain: "wallet-3d85d.firebaseapp.com",
  projectId: "wallet-3d85d",
  storageBucket: "wallet-3d85d.appspot.com",
  messagingSenderId: "502629139602",
  appId: "1:502629139602:web:47c16456f6ddb8eeef124b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const firestore = (
//   firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
// ).firestore();

export default NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  secret: process.env.JWT_SECRET,
});
