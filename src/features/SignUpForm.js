import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// This is bootstrap form component that is used to login and sign up
const SignUpForm = ({
  details,
  setDetails,
  handleSubmit,
  showConfirmPassword = true,
}) => {
  // This is useNavigate Hook that is used to navigate to a different page
  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="signUp-form">
      {/* Here is the name section, I used ternary to hide this section for the login page  */}
      <Form.Group
        className={showConfirmPassword ? '"mb-3"' : "hide"}
        controlId="Name"
      >
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={details.name}
          onChange={(event) => {
            setDetails({ ...details, name: event.target.value });
          }}
          type="text"
          placeholder="Name"
          required={showConfirmPassword ? true : false}
        />
      </Form.Group>
      {/* Here is the email section */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={details.username}
          onChange={(event) => {
            setDetails({ ...details, username: event.target.value });
          }}
          type="email"
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-dark">
          {showConfirmPassword
            ? `We only accept the emails that end with "@gmail.com".`
            : ""}
        </Form.Text>

        {/* Here is the password section */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={details.password}
          onChange={(event) => {
            setDetails({ ...details, password: event.target.value });
          }}
          type="password"
          minLength={6}
          placeholder="Password"
          required
        />
      </Form.Group>
      {/* Here is the confirm password section, I used ternary to hide this section for the login page  */}
      <Form.Group
        className={showConfirmPassword ? "mb-3" : "hide mb-3"}
        controlId="formBasicConfirmPassword"
      >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          value={details.confirmPassword}
          onChange={(event) => {
            setDetails({ ...details, confirmPassword: event.target.value });
          }}
          type="password"
          placeholder="Confirm Password"
          required={showConfirmPassword ? true : false}
        />
      </Form.Group>{" "}
      {/* Here I used ternary to navigate to the main page when the button is clicked */}
      <Button variant="primary" type="submit">
        Submit
      </Button>{" "}
    </Form>
  );
};

export default SignUpForm;
