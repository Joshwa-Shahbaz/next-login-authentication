//imports from react
import React, { useContext, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

//context api
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "@/containers/login";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  // console.log("loading >>", loading);
  // console.log("user >>", user);

  // useLayoutEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     console.log("storedUser>11>", storedUser);
  //     router.push("/login");
  //   } else {
  //     console.log("storedUser>14>", storedUser);
  //     router.push("/dashboard");
  //   }
  // }, [router.pathname]);

  return (
    <>
      {!loading && user ? children : null}
      {/* {loading ? (
        <h1>loading</h1>
      ) : user ? (
        children
      ) : (
        <LoginForm />
      )} */}
    </>
  );
};

export default ProtectedRoute;
