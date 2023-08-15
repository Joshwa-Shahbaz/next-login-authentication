// react imports
import LoginForm from "@/containers/login";
import React from "react";

// useAuth
import useAuth from "@/utils/hooks/useAuth";

const Login = () => {
  const { user } = useAuth({
    redirectOn: "login",
    redirectTo: "/dashboard",
  });

  if (user) {
    return null;
  }

  return <LoginForm />;
};

export default Login;
