import React from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import User from "../features/users/User";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <User />
    </div>
  );
};

export default App;
