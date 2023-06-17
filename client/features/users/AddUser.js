import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "./AddUserSlice";

export default function AddUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [formError, setFormError] = useState(""); // State to track form errors

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any of the form fields are empty
    if (
      !username.trim() ||
      !password.trim() ||
      !email.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      setFormError("All fields are required."); // Set form error message
      return; // Exit the function
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      dispatch(addNewUser(newUser));

      // Clear form fields
      setUserName("");
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setFormError(""); // Clear form error message
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Fill me out to create a new user</h1>
      <form onSubmit={handleSubmit}>
        <div id={"add-user-form"}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="firstName">First Name</label>
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
          {formError && <p>{formError}</p>}{" "}
          {/* Display form error message if present */}
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
