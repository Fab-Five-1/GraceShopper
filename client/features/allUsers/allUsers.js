import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { fetchAllUsers, selectAllUsers } from "./allUsersSlice.js";

// Your goal is to display all Users on admin site only

export default function AllUsers() {
  const dispatch = useDispatch(); // calls every function in my redux // need this to call 'fetchAllStudents' from slice

  const allUsers = useSelector(selectAllUsers) || []; // selectAllUsers is not the right color should be light blue/grey instead of yellow
  console.log("1 ---------> req from server");

  useEffect(() => {
    dispatch(fetchAllUsers()); // import this slice at beginning of this file
  }, []);

  if (!allUsers) {
    return <div>Loading...</div>; // Handle the case when allUsers is still undefined
  }

  console.log("This is allUsers----->", allUsers);

  //   return (
  //     <div>AllUsers is Route is working</div>
  //   )
  return (
    <div id="users">
      <div id="user-list">
        <h2>List of all Users</h2>
        
        {allUsers.map((user) => {
          return (
            <div style = {{borderBottom: "5px solid gray"}} key={user.id}>
              {" "}
              <span style= {{ marginRight: "25px" }} > {user.id}</span>
              <span style= {{ marginRight: "25px" }} >Username: {user.username}</span>
              {/* <span style= {{ marginRight: "25px" }}>Password: {user.password}</span> */}
              <span style= {{ marginRight: "25px" }}>Email: {user.email}</span>
              <span style= {{ marginRight: "25px" }}>First Name: {user.firstName}</span>
              <span style= {{ marginRight: "25px" }}>Last Name: {user.lastName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
