import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ToDo from "./pages/ToDo";
import Header from "./features/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./features/toDo";
// Create an object that will be used in the forms
let user = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

function App() {
  // Create the needed states
  const [list, setList] = useState(null);
  const [token, setToken] = useState("");
  const [signUp, setSignUp] = useState(user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [input, setInput] = useState("");
  // Use the redux state
  const state = useSelector((state) => state.toDo);
  const dispatch = useDispatch();
  // This will navigate to different page
  const navigate = useNavigate();
  const URL = "https://todo-app-server-gmr1.herokuapp.com";

  const fetchLogin = async (e) => {
    try {
      //  Create the option to fetch
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      };
      e.preventDefault();
      // Fetch the data from the server
      // If the response is not ok throw the error
      const response = await fetch(`${URL}/users/login`, options);
      if (!response.ok) throw Error("Did not receive the expected data");
      // Convert the data from json
      const data = await response.json();
      // If data has a message
      if (!data.message) {
        // Update the states
        setToken(data.token);
        setLoggedIn((prev) => !prev);
        navigate("/");
      } else {
        alert(data.message);
      }
      // Catch the error and set the fetchError to the error's message
    } catch (error) {
      alert(error);
    }
  };
  // Fetch signup hook
  const fetchSignUp = async (e) => {
    try {
      //  Create the option to fetch
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      };
      e.preventDefault();
      // Fetch the data from the server
      // If the response is not ok throw the error
      const response = await fetch(`${URL}/users/signUp`, options);
      if (!response.ok) throw Error("Something went wrong");
      // Convert the data from json
      const data = await response.json();
      // If the message from data is not success
      if (data.message !== "Account successfully created") {
        alert(data.message);
        setSignUp(user);
      } else {
        alert(data.message);
        // Call the fetch login
        await fetchLogin(e);
      }
      // Catch the error and set the fetchError to the error's message
    } catch (error) {
      alert(error);
    }
  };

  // Use useEffect hook to render only when the state updates
  useEffect(() => {
    const fetchList = async () => {
      try {
        //  Create the option for fetch
        const options = {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        };
        // Fetch the data from the server
        // If the response is not ok throw the error
        if (token) {
          const response = await fetch(
            `${URL}/users/${signUp.username}`,
            options
          );
          if (!response.ok) throw Error("Did not receive the expected data");
          // Convert the data from json
          const data = await response.json();
          if (data) {
            if (!data.message) setList(data);
          }
        }
        // Catch the error
      } catch (error) {
        console.log(error);
      }
    };
    fetchList();
  }, [token, signUp.username]);

  // Use useEffect to render only when the states updates
  useEffect(() => {
    // If the list not null call the add reducer for each element in the array
    if (list !== null) {
      if (list.todo.length > 0) {
        const todo = list.todo;
        todo.forEach(({ _id, content, completed }) => {
          dispatch(add([content, _id, completed]));
        });
      }
    }
  }, [list, dispatch]);

  // Add todo hook
  const addToDo = async (e) => {
    const newTodo = {
      id: state.nextId,
      username: signUp.username,
      content: input,
      completed: false,
    };
    try {
      //  Create the option for fetch
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      };
      e.preventDefault();
      // Fetch the data from the server
      // If the response is not ok throw the error
      const response = await fetch(`${URL}/users/addTodo`, options);
      if (!response.ok) throw Error("Something went wrong");
      // Convert the data from json
      const data = await response.json();
      if (data.message !== "Todo successfully added!") alert(data.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      //  Create the option to fetch
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUp.username,
          id: id,
        }),
      };
      // Fetch the data from the server
      // If the response is not ok throw the error
      const response = await fetch(`${URL}/users/delete`, options);
      if (!response.ok) throw Error("Something went wrong");
      // Convert the data from json
      const data = await response.json();
      if (data.message !== "Success") alert(data.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = async (id, content, completed = false) => {
    try {
      //  Create the option to fetch
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signUp.username,
          id: id,
          content: content ? content : state.data[id].content,
          completed: completed ? !state.data[id].completed : false,
        }),
      };
      // Fetch the data from the server
      // If the response is not ok throw the error
      const response = await fetch(`${URL}/users/edit`, options);
      if (!response.ok) throw Error("Something went wrong");
    } catch (error) {
      alert(error);
    }
  };

  // Add the components to the app
  return (
    <main>
      <Header name={list ? list.name : ""} loggedIn={loggedIn} />
      {/* Create the routes */}
      <Routes>
        {/* The route to the login and todo pages depending on the loggedIn state */}
        <Route
          path={"/"}
          element={
            <ToDo
              input={input}
              setInput={setInput}
              addToDo={addToDo}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="login"
          element={
            <Login
              signUp={signUp}
              setSignUp={setSignUp}
              handleSubmit={fetchLogin}
            />
          }
        />
        {/* The route to the signup page */}
        <Route
          path="signUp"
          element={
            <SignUp
              signUp={signUp}
              setSignUp={setSignUp}
              handleSubmit={fetchSignUp}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
