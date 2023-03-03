import React from "react";
import SignUpForm from "../features/SignUpForm";
// This is the sign up page
const SignUp = ({ signUp, setSignUp, handleSubmit }) => {
  return (
    <div>
      <h2 className="text-dark">Please Sign Up</h2>
      {/* Here I add the sign up form component */}
      {/* And pass the necessary props  */}
      <SignUpForm
        details={signUp}
        setDetails={setSignUp}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default SignUp;
