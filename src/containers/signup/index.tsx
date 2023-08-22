// imports from react
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";

// context api
import { AuthContext } from "../../../context/AuthContext";

const SignupForm = () => {
  let { signup, emailError, passwordError } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignup = async (data: any) => {
    console.log(data.role);
    console.log("checking");
    try {
      await signup(
        data.email,
        data.password,
        data.userName,
        data.fullName,
        data.role
      );
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center relative top-[50px] px-6 py-5 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center">
              Sign Up
            </h1>
            {/* <p className="block text-[14px] text-[#33363D]">
              It is quick and easy
            </p> */}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSignup)}
            >
              <div className="flex justify-around">
                <div className="mb-[0.125rem]  min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-orange before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-orange checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                    type="radio"
                    // name="flexRadioDefault"
                    id="radioDefault01"
                    defaultValue="Talent"
                    {...register("role")}
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="radioDefault01"
                  >
                    Talent
                  </label>
                </div>
                <div className="mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-orange before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-orange checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                    type="radio"
                    // name="flexRadioDefault"
                    id="radioDefault02"
                    checked
                    defaultValue="Admin"
                    {...register("role")}
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="radioDefault02"
                  >
                    Admin
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  user name
                </label>
                <input
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g joshwa"
                  type="text"
                  {...register("userName", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  full name
                </label>
                <input
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="e.g joshwa shahbaz"
                  type="text"
                  {...register("fullName", {
                    required: true,
                  })}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                <p>{emailError}</p>
                {errors.email && (
                  <span className="text-[14px] text-red-500">
                    invalid email
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: true,
                  })}
                />
                <p>{passwordError}</p>
                {errors.password && <span></span>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                sign in to your account
                <Link
                  href="/login"
                  className="font-medium hover:underline text-orange"
                >
                  &nbsp;Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
