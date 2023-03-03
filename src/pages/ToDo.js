import React from "react";
import AddList from "../features/AddList";
import Form from "../features/Form";

// This is the to do page
const ToDo = ({ input, setInput, addToDo, handleDelete, handleEdit }) => {
  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      {/* Here I added the Form and Add list components with necessary props */}
      <Form input={input} setInput={setInput} addToDo={addToDo} />
      <AddList handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};

export default ToDo;
