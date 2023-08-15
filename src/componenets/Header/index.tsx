import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link";
import useAuth from "@/utils/hooks/useAuth";

const Header = () => {
  let { logout } = useContext(AuthContext);
  const { user } = useAuth({ redirectOn: "logout", redirectTo: "/login" });

  return (
    <header>
      <nav className=" px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center text-yellow text-[25px]">
            <span className="self-center  font-semibold whitespace-nowrap dark:text-white">
              <span className="text-orange">FireBase</span> login
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="text-white bg-orange font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  target="_blank"
                  href="https://firebase.google.com"
                  className="text-white bg-orange font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
