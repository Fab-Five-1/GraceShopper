import React from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import AddUser from "../features/users/AddUser";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      {/* <AddUser /> */}
    </div>
  );
};

export default App;
