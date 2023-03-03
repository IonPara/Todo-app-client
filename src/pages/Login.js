import React from "react";
import SignUpForm from "../features/SignUpForm";
// This is the login page
const Login = ({ signUp, setSignUp, handleSubmit }) => {
  return (
    <div className="login">
      <h2 className="text-dark">Please Login</h2>
      {/* Here I add the sign up form component */}
      {/* And pass the necessary props  */}
      <SignUpForm
        details={signUp}
        setDetails={setSignUp}
        handleSubmit={handleSubmit}
        showConfirmPassword={false}
      />
    </div>
  );
};

export default Login;
