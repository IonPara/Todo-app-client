import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { edit } from "./toDo";
// Import button and alert from bootstrap
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

// Create a component for an alert
function EditAlert({ index, handleEdit }) {
  // Call dispatch and save it ot a variable
  const dispatch = useDispatch();
  // Destructure the useState() for our alert
  const [show, setShow] = useState(false);
  // Destructure the useState() for our input
  const [input, setInput] = useState("");
  // Create a Hook that will handle the submit
  const handleSubmit = (event) => {
    // When the event is triggered
    // Call dispatch and edit reducer with 2 arguments
    // The index property and input state
    dispatch(edit([index, input]));
    // Set show state to false
    setShow(false);
    // Prevent the page from reloading
    event.preventDefault();
    // Reset input
    setInput("");
  };
  // Return an alert that will pop-up when a button is clicked
  return (
    <>
      {/* Use the alert component , set "show" equal to show state */}
      <Alert
        className=" alert d-flex justify-content-evenly align-items-center"
        show={show}
        variant="success"
      >
        {/* Add alert heading */}
        <Alert.Heading className="alert-heading">
          Enter new value:
        </Alert.Heading>
        {/* Create a form tha will have an input field, add the "handleSubmit" to onSubmit event */}
        <form
          className="Form"
          onSubmit={(event) => {
            handleSubmit(event);
            handleEdit(index, input);
          }}
        >
          <label>
            <input
              className="input"
              type="text"
              name="value"
              // Set the state of the input to its value
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </label>
          {/* Add a button and make it disabled when the the input field is empty */}
          <Button
            className="button"
            type="submit"
            disabled={input ? false : true}
            variant="outline-success"
          >
            Save
          </Button>
        </form>
      </Alert>
      {/* Add the button that will change the state of the alert */}
      {!show && (
        <Button className="button editItem" onClick={() => setShow(true)}>
          Edit
        </Button>
      )}
    </>
  );
}

// Export the component
export default EditAlert;
