import React from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import AddUser from "../features/users/AddUser";
import Home from "../features/home/Home";

const App = () => {
  return (
    <div>
      <Home />
      {/* <Navbar />
      <AppRoutes /> */}
      {/* <AddUser /> */}
    </div>
  );
};

export default App;
