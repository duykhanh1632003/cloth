import React, { useState } from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="header-wrapper">
      <div className="content-left">
        <div className="logo" onClick={() => handleNavigation("/")}>
          <img
            src="https://file.hstatic.net/1000344185/file/logo-swe_910a23eb7d84446d96937ca62f6d3751.png"
            alt="Logo"
          />
        </div>
        <div className="title-left" onClick={() => handleNavigation("/")}>
          home
        </div>
        {((user && user.auth) || window.location.pathname === "/") && (
          <div className="admin-product">
            {user.role === "R1" && (
              <div
                className="title-left"
                onClick={() => handleNavigation("/tableUser")}
              >
                bảng người dùng
              </div>
            )}
            {(user.role === "R1" || user.role === "R2") && (
              <div
                className="title-left"
                onClick={() => handleNavigation("/detailItem")}
              >
                thêm sản phẩm
              </div>
            )}
          </div>
        )}
      </div>
      {((user && user.auth) || window.location.pathname === "/") && (
        <div className="content-right">
          <div className="cart" onClick={() => handleNavigation("/checkout/cart")}>
            <i className="mdi mdi-cart"></i>
          </div>
          {user.auth === true ? (
            <div className="logout-link" onClick={handleLogout}>
              logout
            </div>
          ) : (
            <div
              className="logout-link"
              onClick={() => handleNavigation("/login")}
            >
              login
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
