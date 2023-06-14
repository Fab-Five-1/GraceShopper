import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "./AddUserSlice";

export default function AddUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
    console.log("submit", newUser);
    try {
      // reduxx land
      dispatch(addNewUser(newUser));

      setUserName("");
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("value of user info ----->", {});

  return (
    // <div>User</div>
    <div>
      <h1> Fill me out to create a new user</h1>
      <form onSubmit={handleSubmit}>
        <div id={"add-user-form"}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="password"> Password </label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="email"> Email </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="firstName"> First Name </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName"> Last Name </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit"> Create </button>
        </div>
      </form>
    </div>
  );
}
