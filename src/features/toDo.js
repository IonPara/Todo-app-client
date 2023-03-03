// Import "createSlice"
import { createSlice } from "@reduxjs/toolkit";

// Create a slice
export const toDoSlice = createSlice({
  // This is the name of the slice of state
  name: "todo",

  // Create the initial value object
  initialState: {
    nextId: 1,
    data: {},
  },

  // Here are the reducers that we will use to manipulate the initial state
  reducers: {
    // This action type reducer will edit the state
    edit: (state, action) => {
      state.data[action.payload[0]].content = action.payload[1];
    },
    // This action type reducer will remove the state
    remove: (state, action) => {
      delete state.data[action.payload];
    },

    // This action type reducer will add a new state
    add: (state, action) => {
      state.data[action.payload[1]] = {
        content: action.payload[0],
        completed: action.payload[2] ? action.payload[2] : false,
      };
      state.nextId =
        action.payload[1] > state.nextId
          ? action.payload[1] + 1
          : state.nextId + 1;
    },

    // This action type reducer will add a new state
    completed: (state, action) => {
      state.data[action.payload].completed =
        !state.data[action.payload].completed;
    },
  },
});

// Export the actions from our counterSlice
export const { edit, remove, add, completed } = toDoSlice.actions;

// Export counterSlice reducer
export default toDoSlice.reducer;
