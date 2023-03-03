import React from "react";
// import redux hooks
import { useSelector, useDispatch } from "react-redux";
// import the action reducers
import { remove, completed } from "./toDo";
// Import the alert component
import EditAlert from "./EditAlert";
import Button from "react-bootstrap/Button";

// Create a component that will add our list to the app
const AddList = ({ handleDelete, handleEdit }) => {
  // Call dispatch
  const dispatch = useDispatch();
  // Use useSelector to access the state from toDo
  const list = useSelector((state) => state.toDo);
  const data = list.data;
  // Create an array that will store all of the keys from the object
  const allKeys = Object.keys(data);
  // Map through the array with the keys
  // For every key create a list element

  const map = allKeys.map((key) => (
    <li key={key} id={key} className="list-element">
      {/* Add an input element of checkbox type */}
      {/* When it's clicked call dispatch with the completed reducer, that will take the key as its argument */}
      <input
        className="button checkbox"
        type="checkbox"
        checked={data[key].completed === true ? true : false}
        onChange={() => {
          handleEdit(key, false, true);
          dispatch(completed(key));
        }}
      ></input>
      {/* Set the inner text to the content from the object */}
      {data[key].content}
      <div className="buttons-container">
        {/* Add the alert component and set its index property to the value of the key */}
        <EditAlert index={key} handleEdit={handleEdit} />
        {/* Add a button that when clicked will remove the element */}
        <Button
          className="removeItem button"
          onClick={() => {
            dispatch(remove(key));
            handleDelete(key);
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  ));
  // Return an unordered list with the map array as its child
  return <ul>{map}</ul>;
};
// Export the component
export default AddList;
