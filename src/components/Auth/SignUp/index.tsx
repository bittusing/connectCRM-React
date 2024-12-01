import { Link } from "react-router-dom";
import { useState } from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignUPForm from "../SignUpForm";
import WelcomePage from "../WelcomePage";
import { Steps, StepsProps } from "antd";
import OnBoardingForm from "../OnBoardingForm";

// Define your items
const items: StepsProps["items"] = [
  {
    title: "Sign up",
  },
  {
    title: "Almost there",
  },
];
export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [onBoardingData, setOnBoardingData] = useState({
    adminName: "",
    timezone: "Asia/Kolkata",
    currency: "INR",
    countryCode: "+91",
    mobileNumber: "",
  });
  const [isFinalStep, setIsFinalStep] = useState(false);

  const handleOnBoardingData = (data: any) => {
    console.log("Onboarding data:", data);
  };

  const handleStepCompletion = (isComplete: any) => {
    console.log("Step completed:", isComplete);
  };

  return (
    <>
      <div
        className={`m-auto flex h-screen w-full overflow-auto  md:items-center md:justify-center ${isFinalStep ? "max-w-md" : "md:max-w-xl xl:max-w-4xl"} `}
      >
        <div className="flex w-full flex-col justify-center gap-5 bg-transparent ">
          {/* steps  */}
          {isFinalStep && (
            <div className="w-full rounded-md bg-transparent px-5 py-3 shadow-card xl:bg-gray-dark">
              <Steps current={1} items={items} />
            </div>
          )}

          {/* Sign up form  */}
          <div className="flex items-center bg-transparent shadow-1 shadow-card xl:bg-gray-dark">
            {!isFinalStep ? (
              <div className="w-full p-5 xl:w-1/2 xl:p-9.5 xl:pr-0">
                <GoogleSigninButton text="Sign up" />

                <div className="my-6 flex items-center justify-center">
                  <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                  <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                    Or sign up with email
                  </div>
                  <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                </div>

                <SignUPForm
                  initialValue={signUpData}
                  setSignUpData={setSignUpData}
                  setIsFinalStep={setIsFinalStep}
                />
                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="xl:p-9.5">
                <OnBoardingForm
                  setOnBoardingData={handleOnBoardingData}
                  setIsFinalStep={handleStepCompletion}
                  initialValue={onBoardingData}
                />
              </div>
            )}
            {!isFinalStep && <WelcomePage />}
          </div>
        </div>
        {/* Add this style block for dark mode support */}
        <style>{`
          // Basic dark mode styles for Steps
          .dark .ant-steps .ant-steps-item-title {
            color: rgba(255, 255, 255, 0.85) !important;
          }

          // Current step styles
          .dark .ant-steps .ant-steps-item-process .ant-steps-item-icon {
            background-color: #5750f1 !important;
            border-color: #5750f1 !important;
          }
          .dark
            .ant-steps
            .ant-steps-item-process
            .ant-steps-item-icon
            .ant-steps-icon {
            color: #fff !important;
          }
          .dark .ant-steps .ant-steps-item-process .ant-steps-item-title {
            color: #fff !important;
          }

          // Completed step styles
          .dark .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
            background-color: transparent !important;
            border-color: #5750f1 !important;
          }
          .dark
            .ant-steps
            .ant-steps-item-finish
            .ant-steps-item-icon
            .ant-steps-icon {
            color: #5750f1 !important;
          }
          .dark .ant-steps .ant-steps-item-finish .ant-steps-item-title {
            color: rgba(255, 255, 255, 0.85) !important;
          }

          // Waiting step styles
          .dark .ant-steps .ant-steps-item-wait .ant-steps-item-icon {
            background-color: transparent !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
          }
          .dark
            .ant-steps
            .ant-steps-item-wait
            .ant-steps-item-icon
            .ant-steps-icon {
            color: rgba(255, 255, 255, 0.3) !important;
          }
          .dark .ant-steps .ant-steps-item-wait .ant-steps-item-title {
            color: rgba(255, 255, 255, 0.45) !important;
          }

          // Step connector styles
          .dark
            .ant-steps
            .ant-steps-item:not(.ant-steps-item-process)
            .ant-steps-item-container[role="button"]:hover
            .ant-steps-item-title {
            color: #5750f1 !important;
          }
          .dark
            .ant-steps
            .ant-steps-item-finish
            > .ant-steps-item-container
            > .ant-steps-item-tail::after {
            background-color: #5750f1 !important;
          }
          .dark
            .ant-steps
            .ant-steps-item-wait
            > .ant-steps-item-container
            > .ant-steps-item-tail::after {
            background-color: rgba(255, 255, 255, 0.3) !important;
          }

          // Description text styles if you have descriptions
          .dark .ant-steps .ant-steps-item-description {
            color: rgba(255, 255, 255, 0.45) !important;
          }
        `}</style>
      </div>
    </>
  );
}
