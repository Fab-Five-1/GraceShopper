import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewStudent } from "../slices/allStudentsSlice";
// import {addNewStudent} after you write in the block of code in src/slices/allStudentsSlice.js

export default function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState(2.0);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      firstName: studentName,
      lastName: lastName,
      email: email,
      gpa: gpa,
    };

    console.log("submit", newStudent);
    try {
     // reduxx land
      dispatch(addNewStudent(newStudent));

      setStudentName("");
      setLastName("");
      setEmail("");
      setGpa(2.0);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("value of student info ---->", {});

  return (
    //   <div>AddStudent</div>
    <div>
      <h1> Fill out the Form to add new student! </h1>
      <form onSubmit={handleSubmit}>
        <div id={"add-student-form"}>
          <label htmlFor="firstName"> First Name </label>
          <input
            type="text"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <label htmlFor="lastName"> Last Name </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email"> Email </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="gpa"> GPA </label>
          <input
            type="number"
            name="gpa"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
          <button type="submit"> Create </button>
        </div>
        
      </form>
    </div>
  );
}
