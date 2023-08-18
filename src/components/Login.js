import React, { useState } from "react";
import "./Login.scss";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "@mdi/font/css/materialdesignicons.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { handleLoginRedux } from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";


function Login() {
  const isLoading  = useSelector(state => state.user.isLoading)
  const account  = useSelector(state => state.user.account)

  const dispath = useDispatch();
  let navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id , setId] = useState("")
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value.trim());
    if (name === "password") setPassword(value);
  };

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) { 
      navigate("/"); // Chuyển hướng nếu đã đăng nhập
    }
  }, []);

  useEffect(()=>{
    if(account && account.auth === true){
      navigate('/')
    }
  },[account])

  const handleLogin = async () => {
    if (email && password) {
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("email", email)

      dispath(handleLoginRedux(email, password));
    }
  };
  const handleGoBack = () => {
    navigate("/");
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (email && password) {
        dispath(handleLoginRedux(email, password));
      }
    }
  };

  const handleRegister = () =>{
    
    navigate('/register')
  }

  return (
    <div className="Login-container col-4">
      <div className="title-login">Đăng nhập</div>
      <div className="text">Email hoặc Tên đăng nhập</div>
      <input
        placeholder="Email hoặc Tên đăng nhập"
        name="email"
        value={email}
        onChange={handleOnChangeInput}
      />
      <div className="password-container">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Mật khẩu"
          className="password-input"
          name="password"
          value={password}
          onChange={handleOnChangeInput}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <i
          className={`password-toggle-icon mdi ${
            passwordVisible ? "mdi-eye-off" : "mdi-eye"
          }`}
          onClick={togglePasswordVisibility}
          onKeyPress={(e) => handleKeyPress(e)}
        ></i>
      </div>
      <div className="forgot-password">Quên mật khẩu?</div>
      <button
        className={email && password ? "login-red" : "login"}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className={`loading-icon mdi mdi-loading mdi-spin`} />
        ) : (
          "Đăng nhập"
        )}
      </button>
      <div className="go-back">
        <i className="mdi mdi-chevron-left"></i>
        <span onClick={() => handleGoBack()}>Go back</span>
      </div>
      <div className="noAccount">Bạn không có tài khoản? <span onClick={() => handleRegister()} className="register-red">Đăng ký</span></div>
      <NotificationContainer />
    </div>
  );
}

export default Login;
