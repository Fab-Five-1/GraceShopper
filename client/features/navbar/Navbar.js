import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* <h1 className="logo">Grandad's Tech</h1> */}
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart 🛒</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div id="navBar">
            {/* The navbar will show these links before you log in */}
            <div>
              <Link className="logo" to="/home">Grandad's Tech</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart🛒</Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
    // );


    //   return (
    //     <div>
    //       <nav>
    //       <h1 className="logo">Grandad's Tech</h1>
    //         {isLoggedIn ? (
    //           <div>
    //             {/* The navbar will show these links after you log in */}
    //             <Link to="/home">Home</Link>
    //             <Link to="/cart">Cart 🛒</Link>
    //             <button type="button" onClick={logoutAndRedirectHome}>
    //               Logout
    //             </button>
    //           </div>
    //         ) : (
    //           <div>
    //             {/* The navbar will show these links before you log in */}
    //             <Link to="/home">Home</Link>
    //             <Link to="/cart">Cart🛒</Link>
    //             <Link to="/login">Login</Link>
    //             <Link to="/signup">Sign Up</Link>
    //           </div>
    //         )}
    //       </nav>
    //       <hr />
    //     </div>
  );
};

export default Navbar;
