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
    <nav>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}

          <div>
            <Link className="logo" to="/home">Grandad's Tech</Link>
          </div>
          <div>
            <Link to="/products">Shop</Link>
            <Link to="/cart">Cart 🛒</Link>
            <button id="logOutButton" type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navBar">
          {/* The navbar will show these links before you log in */}
          <div>
            <Link className="logo" to="/home">Grandad's Tech</Link>
          </div>
          <div>
            <Link to="/products">Shop</Link>
            <Link to="/login">Login</Link>
            {/* <Link to="/signup">Sign Up</Link> */}
            <Link to="/cart">Cart🛒</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
