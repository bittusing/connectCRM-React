import { Metadata } from "next";
import metadataStatic from "@/utils/metadataStatic";
import LoginPage from "@/components/Pages/Authentication/LoginPage";
export const metadata: Metadata = metadataStatic;

const SignUpPage = () => {
  return (
    <div className="linePattern_Container overflow-auto dark p-5 md:p-0">
      <LoginPage isSignIn={false} />
    </div>
  );
};

export default SignUpPage;
