import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//
import { AuthContext } from "../../../context/AuthContext";

type UseAuthArgs = {
  redirectOn: "login" | "logout";
  redirectTo: string;
};

const UseAuth = ({ redirectOn, redirectTo }: UseAuthArgs) => {
  const { user, authChecked } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authChecked) {
      if (redirectOn === "login" && user) {
        router.push(redirectTo);
      }
      if (redirectOn === "logout" && !user) {
        router.push(redirectTo);
      }
    }
  }, [user, authChecked, redirectOn, router, redirectTo]);

  return { user, authChecked };
};

export default UseAuth;
