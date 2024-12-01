import LoginPage from "../../Pages/Authentication/LoginPage";

const SignUpPage = () => {
  return (
    <div className="linePattern_Container overflow-auto dark p-5 md:p-0">
      <LoginPage isSignIn={false} />
    </div>
  );
};

export default SignUpPage;
