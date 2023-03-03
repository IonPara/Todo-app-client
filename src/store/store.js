import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../features/toDo";

// The configureStore function will automatically set up an empty store 
// with the relevant settings needed.
export default configureStore({
    reducer: {
        toDo: toDoReducer,
    },
});
