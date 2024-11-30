import { Metadata } from "next";
import metadataStatic from "@/utils/metadataStatic";
import LoginPage from "@/components/Pages/Authentication/LoginPage";
export const metadata: Metadata = metadataStatic;

const LoginPageUI = () => {
  return (
    <div className="linePattern_Container dark overflow-auto p-5 md:p-0">
      <LoginPage isSignIn={true} />
    </div>
  );
};

export default LoginPageUI;
