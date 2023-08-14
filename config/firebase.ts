import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpkApwq06zX5SEZrfvX5IQxRFIs_meEYU",
  authDomain: "next-auth-924eb.firebaseapp.com",
  projectId: "next-auth-924eb",
  storageBucket: "next-auth-924eb.appspot.com",
  messagingSenderId: "410204332429",
  appId: "1:410204332429:web:dddefd6ef69d949a339dc4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
