import LoginPage from "../../Pages/Authentication/LoginPage";

const LoginPageUI = () => {
  return (
    <div className="linePattern_Container dark overflow-auto p-5 md:p-0">
      <LoginPage isSignIn={true} />
    </div>
  );
};

export default LoginPageUI;
