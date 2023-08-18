import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BuyProductDone.scss";
import {
  getProductCartbyIdItem,
  handleSubMitDone,
  getDetailUser,
  handleOnChangeNumber,
} from "../service/userService";
import CartShopAProduct from "./CartShopAProduct";
import * as action from "../redux/action/index";
import "@mdi/font/css/materialdesignicons.min.css";
import { useNavigate } from "react-router-dom";

const BuyProductDone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getAllProductCartRedux = useSelector(
    (state) => state.user.getAllProductCartRedux
  );

  useEffect(() => {
    dispatch(action.getProductCartbyIdItem());
  }, [dispatch]);

  const handleGoBackHome =async () =>{
	navigate('/')
  }

  return (
    <div className="body">
      <div className="title">Bạn đã đăng ký mua hàng thành công</div>
	  <button className="register-done" onClick={() => handleGoBackHome()}>Bấm vào đây để qua lại trang chủ</button>
    </div>
  );
};

export default BuyProductDone;
