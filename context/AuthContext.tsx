//imports from react
import { ReactNode, createContext, useEffect, useId, useState } from "react";

//imports from firebase
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

//config/firebase
import { auth, firestore } from "../config/firebase";

export const AuthContext = createContext({
  user: null,
  signup: (
    email: string,
    password: string,
    fullName: string,
    userName: string
  ) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  authChecked: false,
  emailError: "",
  passwordError: "",
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user >>", user);

      if (user) {
        const userData = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string,
    password: string,
    userName: string,
    fullName: string
  ) => {
    clearError();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      console.log("uid>>>>>>>>>>>", uid);
      const userDocRef = doc(firestore, "users", uid);
      console.log("userCredential>>>>>>>", userCredential);
      await setDoc(userDocRef, {
        userName: userName,
        fullName: fullName,
        email,
      });
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        default:
          console.error("Signup error:", err);
      }
    }
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          console.error("Login error:", err);
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        authChecked,
        emailError,
        passwordError,
      }}
    >
      {authChecked ? children : <h2>Loading...</h2>}
    </AuthContext.Provider>
  );
}
