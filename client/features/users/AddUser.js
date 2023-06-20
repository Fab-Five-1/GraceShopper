import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "./AddUserSlice";

export default function AddUser() {
  // Define state variables using the useState hook
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [PasswordMatchError, setPasswordMatchError] = useState(false); // New state variable for password match error

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and passwordConfirmation match
    if (password != passwordConfirmation) {
      setPasswordMatchError(true); // Set the password match error to true
      // console.log("Passwords do not match");
      // prompt("Passwords do not match, please try again");
      return;
    }

    // Create a new user object with the entered values
    const newUser = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      // reduxx land
      // Dispatch an action to add the new user to the store
      dispatch(addNewUser(newUser));

      // Reset the form fields to empty
      setUserName("");
      setPassword("");
      setPasswordConfirmation(""); // added Password confirmation
      setEmail("");
      setFirstName("");
      setLastName("");
      setPasswordMatchError(false); // Reset the password match error to false
      console.log("submit", newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Welcome to Your Grandaddy's Tech. Create your account here.</h1>
      <form onSubmit={handleSubmit}>
        <div id={"add-user-form"}>
          <label htmlFor="firstName"> First Name </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email"> Email </label>
          <input
            type="text" // for security "type=password"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="password"> Password </label>
          <input
            type="text" // Can change the input type to "password" for security
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="text" // Can change the input type to "password" for security
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {/* added user experience and security - can also re-enter password twice to match */}
          {/* Display an error message if passwords do not match */}
          {PasswordMatchError && (
            <div style={{ color: "red" }}>
              Passwords do not match, please try again{" "}
            </div>
          )}

          <br />

          <button type="submit"> Create </button>
        </div>
      </form>
    </div>
  );
}

// This code represents a React component called AddUser. It is a form that allows users to enter information to create a new user. Going through the code step by step:

// Import necessary dependencies and the addNewUser action from the AddUserSlice file.
// Define the AddUser function component. It represents the form for adding a new user.
// Use the useState hook to define state variables and their corresponding setter functions. These state variables hold the values entered by the user in the form fields (e.g., username, password, email, etc.).
// Get the dispatch function from the Redux store using the useDispatch hook. This function allows you to dispatch actions to the Redux store.
// Define the handleSubmit function, which is called when the form is submitted. It prevents the default form submission behavior, creates a newUser object with the entered values, dispatches the addNewUser action with the newUser object, and then resets the form fields to empty.
