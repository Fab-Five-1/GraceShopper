//imports the necessary dependencies and actions from various modules.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "./allUsersSlice.js";

// Your goal is to display all Users on admin site only

export default function AllUsers() {
  const dispatch = useDispatch(); // Hook to acess the Redux dispatch function // calls every function in my redux // 
  
  const allUsers = useSelector(selectAllUsers) || []; // Retrieves allUsers state from Redux store
  // If allUsers is null or undefined, set it to an empty array
  // This ensures we have an empty array instead of a falsy value
  // Note selectAllUsers is a selector function that extracts the allUsers state from the Redux store 

  console.log("1 ---------> req from server");

  useEffect(() => {
    // useEffect hook runs once when the component is mounted
    // Dispatches the fetchAllUsers action to fetch all users from the server and update the state
    dispatch(fetchAllUsers()); 
  }, []);

   // Conditional rendering when allUsers is still undefined
  if (!allUsers) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  console.log("This is allUsers----->", allUsers);

// Render the user list
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



// This code imports the necessary dependencies and actions from various modules. It imports React and the useEffect hook from the "react" package. It also imports useDispatch and useSelector hooks from the "react-redux" package. Additionally, it imports the fetchAllUsers action and selectAllUsers selector from the "./allUsersSlice.js" file.


// This is a functional component called AllUsers. It initializes the dispatch function using the useDispatch hook from React Redux. It also retrieves the allUsers state using the useSelector hook and the selectAllUsers selector. If allUsers is null or undefined, it sets it to an empty array. The console.log statement logs a message to the console.


// This is an effect hook, useEffect, that runs only once when the component is mounted. It dispatches the fetchAllUsers action, which is responsible for fetching all users from the server and updating the state.


// This conditional statement checks if allUsers is falsy (null, undefined, or an empty array). If it is, it returns a loading message to be displayed until the data is fetched.


// Finally, this code renders the user list. It uses the allUsers.map() function to iterate over each user in the allUsers array and render the user's information. Each user is displayed in a <div> element with a gray bottom border. The user's ID, username, email, first name, and last name are displayed using <span> elements with appropriate styles.
