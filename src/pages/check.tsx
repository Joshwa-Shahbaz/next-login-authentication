import useAuth from "@/utils/hooks/useAuth";
import React from "react";

const Check = () => {
  const { user } = useAuth({ redirectOn: "logout", redirectTo: "/login" });
  return user ? (
    <section className="h-[80vh]]">
      <div className="flex flex-col justify-center relative top-[50px] text-orange ">
        <h1 className="flex justify-center text-[25px] font-semibold">
          checking the page
        </h1>
      </div>
    </section>
  ) : null;
};

export default Check;
