//imports from react
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//imports from firebase
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//config/firebase
import { auth } from "../config/firebase";

export const AuthContext = createContext({
  user: null,
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  loading: true,
  emailError: "",
  passwordError: "",
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
    // console.log(storedUser, "jahdskjvcjb");
    // const authUserActive = localStorage.getItem("user");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user >>", user);

      if (user) {
        const userData = {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        setUser(userData);
        // console.log("context user", user);
        // localStorage.setItem("user", JSON.stringify(userData));
      } else {
        // console.log("User not authenticated.");
        setUser(null);
        // localStorage.removeItem("user");
        // router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    clearError();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log("New user registered >>", user);
      })
      .catch((err) => {
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
      });
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // return user;
      })
      .catch((err) => {
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
        loading,
        emailError,
        passwordError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
