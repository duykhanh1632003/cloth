import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartIcon.scss";
import {
  getProductCartbyId,
  getDetailUser,
  handleSubMitDone,
  handleOnChangeNumber,
  handleSubMitEmail
} from "../service/userService";
import CartShopAProduct from "./CartShopAProduct";
import * as action from "../redux/action/index";
import "@mdi/font/css/materialdesignicons.min.css";
import { redirect } from "react-router-dom";


class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllProductCart: [],
      avatar: "",
      sotanggiam: "",
      numerWantBuy: "",
      isDidUpdate: false,
      detailUser: {},
      total: "",
    };
  }

  async componentDidMount() {
    this.props.getProductCartbyIdItem();
    this.setState({
      getAllProductCart: this.props.getAllProductCartRedux,
    });

    // Lấy chi tiết người dùng
    let data = await getDetailUser(localStorage.getItem("id"));
    this.setState({
      detailUser: data.data,
    });

    // Tính tổng giá tiền
    let totalPrice = 0;
    let { getAllProductCart } = this.state;
    getAllProductCart.forEach((item) => {
      totalPrice += item.totalMoneyCart;
    });
    totalPrice.toString()
    this.setState({
      total: totalPrice,
    });
  }

  componentDidUpdate(prevProps) {

    if (prevProps.getAllProductCartRedux !== this.props.getAllProductCartRedux) {
      this.setState({
        getAllProductCart: this.props.getAllProductCartRedux,
      });
      let totalPrice = 0;
      let { getAllProductCart } = this.state;
      getAllProductCart.forEach((item) => {
        totalPrice += item.totalMoneyCart;
      });
      totalPrice.toString()
      this.setState({
        total: totalPrice,
      });
    }
  }

  handleSubmitProduct =async () =>{
    if(this.state.getAllProductCart.length > 0){
      window.location.replace('/buydone');
      let {total ,getAllProductCart } = this.state
      console.log("Check state",getAllProductCart)
      await handleSubMitEmail(getAllProductCart)
      await handleSubMitDone(localStorage.getItem("id"))
      let data1 = {}

    }
    else{
      alert("Bạn vui lòng chọn sản phẩm")
    }
  }

  render() {
    let { getAllProductCart, avatar, detailUser, total } = this.state;

    return (
      <div className="body">
        <div className="title">GIỎ HÀNG</div>
        <div className="container-cart">
          <div className="content">
            <div className="content-left">
              {/* {getAllProductCart &&
                getAllProductCart.map((item, index) => {
                  return (
                    <div className="content-left-container" key={index}>
                      <div className="house-title">
                        <span class="mdi mdi-home-variant-outline"></span>
                        VBooks<i class="mdi mdi-chevron-right"></i>
                      </div>
                      <div className="product-detail">
                        <div className="col-book">
                          <div className="anh-product">
                            <img src={item.AdminItem.image} />
                          </div>
                          <div className="name-product">
                            <div className="name">{item.name}</div>
                            <div className="fast">
                              <span>FAST</span> giao hàng tiết kiệm
                            </div>
                          </div>
                        </div>
                        <div className="price">
                          {(item.price).toLocaleString(
                            "vi-VN"
                          )}.000đ
                        </div>

                        <div className="count-product">
                          <div className="minus" onClick={() => this.handleOnChangeNumberTru(item)}>
                            <span class="mdi mdi-minus"></span>
                          </div>
                          <div className="so-middle">
                            <input onChange={(e) => this.handleOnChangInputSo(e)} value={item.numerWantBuy} />
                          </div>
                          <div className="add" onClick={() => this.handleOnChangeNumberCong(item)}>
                            <span class="mdi mdi-plus"></span>
                          </div>
                        </div>
                        <div className="total-price">
                          <span>{(item.price * item.numerWantBuy).toLocaleString(
                            "vi-VN"
                          )}.000đ</span>
                        </div>
                        <div className="trash-bin">
                          <span class="mdi mdi-trash-can-outline"></span>
                        </div>
                      </div>
                    </div>
                  );
                })} */}

              {getAllProductCart &&
                getAllProductCart.map((item, index) => {
                  return (
                    <CartShopAProduct
                      data={item}
                      avatar={item.AdminItem.image}
                      name={item.name}
                      id={item.id}
                      idUser={item.idUser}
                      numerWantBuy={item.numerWantBuy}
                      price={item.price.toLocaleString("vi-VN")}
                      currentNumber={item.currentNumber}
                      idItem={item.idItem}
                      total={(item.price * item.numerWantBuy).toLocaleString(
                        "vi-VN"
                      )}
                    />
                  );
                })}
            </div>

            <div className="content-right">
              <div className="detail-user">
                <div className="location">
                  <div className="header-location">
                    <div className="title-location">Giao tới</div>
                    <div className="change-location">Thay đổi</div>
                  </div>
                </div>
                <div className="name-phoneNumber">
                  <div className="name">
                    {detailUser.firstName} {detailUser.lastName}
                  </div>
                  <div className="phoneNumber">{detailUser.phonenumber}</div>
                </div>
                <div className="address">
                  <span>Nhà</span>
                  {detailUser.address}
                </div>
              </div>
              <div className="price-money">
                <div className="temporary-caculate">
                  <div className="temporary-caculate-name">Tạm tính</div>
                  <div className="temporary-caculate-price">
                    {(total).toLocaleString("vi-VN")}.000đ
                  </div>
                </div>
                <div className="total-money">
                  <div className="total-money-name">Tổng tiền</div>
                  <div className="total-money-price">
                    <span className="main">{(total).toLocaleString("vi-VN")}.000đ</span>
                    <span className="vat">(Đã bao gồm VAT nếu có)</span>
                  </div>
                </div>
              </div>
              <button className="submit-form" onClick={() =>this.handleSubmitProduct()}>Mua Hàng</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getAllProductCartRedux: state.user.getAllProductCartRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductCartbyIdItem: () => dispatch(action.getProductCartbyIdItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
