import React from "react";
// Import the redux hooks
import { useDispatch, useSelector } from "react-redux";
// Import the add reducer
import { add } from "./toDo";
import Button from "react-bootstrap/Button";

// Create a form component
const Form = ({ input, setInput, addToDo }) => {
  // Destructure the useState for the input
  const dispatch = useDispatch();
  const nextId = useSelector((state) => state.toDo.nextId);

  // Create a handleSubmit hook
  const handleSubmit = (event) => {
    // When triggered
    // Call the "add" action reducer  with the "input" state as its argument
    dispatch(add([input, nextId]));
    setInput("");
    // Prevent the page to reload on submit
    event.preventDefault();
  };
  return (
    // Add the handle submit to the onSubmit event
    <form
      className="form"
      onSubmit={(e) => {
        addToDo(e);
        handleSubmit(e);
      }}
    >
      <label>
        New value:{" "}
        <input
          maxLength={140}
          className="input"
          type="text"
          name="value"
          // Set the state of the input to its value
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </label>
      {/* Add a button that will be disabled when the input field is empty */}
      <Button
        className="add-item button mt-2"
        type="submit"
        disabled={input ? false : true}
      >
        Add
      </Button>
    </form>
  );
};

export default Form;
