import SignupForm from "@/containers/signup";
import React from "react";

// useAuth
import useAuth from "@/utils/hooks/useAuth";

const signup = () => {
  const { user } = useAuth({
    redirectOn: "login",
    redirectTo: "/login",
  });

  if (user) {
    return null;
  }

  return <SignupForm />;
};

export default signup;
