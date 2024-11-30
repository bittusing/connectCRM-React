"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import WelcomePage from "../WelcomePage";

export default function Signin() {
  return (
    <>
      <div className="m-auto flex h-screen w-full overflow-auto md:max-w-xl md:items-center md:justify-center xl:max-w-4xl">
        <div className="flex w-full items-center bg-transparent shadow-1 shadow-card xl:bg-gray-dark">
          {" "}
          <div className="w-full p-5 xl:w-1/2 xl:p-9.5 xl:pr-0">
            <GoogleSigninButton text="Sign in" />

            <div className="my-6 flex items-center justify-center">
              <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
              <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                Or sign in with email
              </div>
              <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            </div>

            <div>
              <SigninWithPassword />
            </div>

            <div className="mt-6 text-center">
              <p>
                Don’t have any account?{" "}
                <Link href="/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <WelcomePage />
        </div>
      </div>
    </>
  );
}
