import React, { useState } from "react";
import "./Header.scss";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogOutRedux,
  handleLoginRedux,
} from "../redux/action/userAction";
import CartIcon from "../Clinent/CartIcon";

const Header = (props) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  useEffect(() => {}, [user.auth]);

  const handleLogout = () => {
    dispatch(handleLogOutRedux());
    // navigate("/login");
  };

  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/");
    }
  }, [user]);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="header-wrapper">
      <div className="logo">
        <NavLink to="/">
          <img src="https://file.hstatic.net/1000344185/file/logo-swe_910a23eb7d84446d96937ca62f6d3751.png" alt="Logo" />
        </NavLink>
        {((user && user.auth) || window.location.pathname === "/") && (
          <>
            <div className="mr-auto">
              <NavLink to="/" exact className="nav-link">
                home
              </NavLink>
              {user.role === "R1" && (
                <NavLink to="/tableUser" className="nav-link">
                  bảng người dùng
                </NavLink>
              )}
              {(user.role === "R1" || user.role === "R2") && (
                <NavLink to="/detailItem" className="nav-link">
                  thêm sản phẩm
                </NavLink>
              )}
            </div>
            <div className="mr-auto">
              <NavLink to="/checkout/cart" className="mdi mdi-cart">
                <i className="mdi mdi-cart"></i>
              </NavLink>
            </div>
            <div>
              {user.auth === true ? (
                <div className="logout-link" onClick={handleLogout}>
                  Logout
                </div>
              ) : (
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
