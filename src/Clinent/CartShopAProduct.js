import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartShopAProduct.scss";
import {
  getProductCartbyId,
  handleOnChangeNumber,
  handleSubmitTotalMoney,
  handleDeleteProductCart,
  handleOnChangeNumberTotal
} from "../service/userService";
import "./CartIcon.scss";
import "@mdi/font/css/materialdesignicons.min.css";
import * as action from "../redux/action/index";


class CartShopAProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      avatar: "",
      sotanggiam: "",
      numerWantBuy: "",
      isDidUpdate: false,
      name: "",
      id : "",
      idUser : "",
      currentNumber : "",
      price :"",
      idItem:"",
      total:"",
      isActiveButton: false,
      totalMoneyCart: 0
    };
  }

  
  // .toLocaleString("vi-VN")
  componentDidMount() {
    let data =  this.props.data
    this.setState({
      avatar : this.props.avatar,
      name : this.props.name,
      id : this.props.id,
      idUser : this.props.idUser,
      numerWantBuy :this.props.numerWantBuy,
      price: this.props.price,
      currentNumber: this.props.currentNumber,
      idItem :this.props.idItem,
      total: this.props.total
    })
  }
  waitOneSecond() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }


  handleDeleteProductCart =async () =>{
    let {id }= this.state
    console.log("Check id",id)
    let response = await handleDeleteProductCart(id)
    await this.waitOneSecond();
    this.props.getProductCartbyIdItem()
  }

  handleOnchangeInput = (e) =>{
    if(e.target.value > this.state.currentNumber){
      alert("Không đủ hàng tồn kho")
      return
    }
    this.setState({
      numerWantBuy: e.target.value
    })
  }

  handleOnChangeNumber = (name) =>{
    if(name==="tru"){
      if(this.state.numerWantBuy -1 < 0){
        return
      }
      this.setState({
        numerWantBuy: this.state.numerWantBuy -1
      })
    }
    if(name==="cong"){
      if(this.state.numerWantBuy + 1 > this.state.currentNumber){
        alert("Không đủ hàng tồn kho")
        return
      }
      this.setState({
        numerWantBuy: this.state.numerWantBuy + 1
      })
    }
  }

  buttonDone =async () =>{
    this.setState({
      isActiveButton: false
    })
   
  }
 

  buttonNotDone =async () =>{
    this.setState({
      isActiveButton : true
    })
    let totalMoneyCart = 0
    let data = {}
    totalMoneyCart = this.state.numerWantBuy * this.state.price
    data.totalMoneyCart  = totalMoneyCart
    data.numerWantBuy = this.state.numerWantBuy
    data.id = this.state.id
    data.idItem = this.state.idItem
    this.props.handleSubmitTotalMoneyRedux(data)
    await this.waitOneSecond();
    this.props.getProductCartbyIdItem()
    
  }

  render() {
      let {avatar , name , id , idUser , numerWantBuy , price , currentNumber , idItem , total ,isActiveButton} = this.state
    return (
        <div className="content-left-container" >
          <div className="house-title">
            <span class="mdi mdi-home-variant-outline"></span>
            VBooks<i class="mdi mdi-chevron-right"></i>
          </div>
          <div className="product-detail">
            <div className="col-book">
              {isActiveButton ?<button className="click-a-item-done" onClick={() => this.buttonDone()}></button> 
              : 
              <button className="click-a-item" onClick={() =>this.buttonNotDone()}></button>}
             

              <div className="anh-product">
                <img src={avatar}/>
              </div>
              <div className="name-product">
                <div className="name">{name}</div>
                <div className="fast">
                  <span>FAST</span> giao hàng tiết kiệm
                </div>
              </div>
            </div>
            <div className="price">
              {price}.000đ
            </div>

            <div className="count-product">
              <div
                className="minus"
                onClick={() => this.handleOnChangeNumber("tru")}
              >
                <span class="mdi mdi-minus"></span>
              </div>
              <div className="so-middle" >
                <input
                  onChange={(e) =>this.handleOnchangeInput(e)}
                  value={numerWantBuy}
                />
              </div>
              <div
                className="add"
                onClick={() => this.handleOnChangeNumber("cong")}
              >
                <span class="mdi mdi-plus"></span>
              </div>
            </div>
            <div className="total-price">
              <span>
                {((price*numerWantBuy).toString()).toLocaleString("vi-VN")}.000đ
              </span>
            </div>
            <div className="trash-bin">
              <span class="mdi mdi-trash-can-outline" onClick={() =>this.handleDeleteProductCart()}></span>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitTotalMoneyRedux: (data) => dispatch(action.handleSubmitTotalMoneyRedux(data)),
    getProductCartbyIdItem: () => dispatch(action.getProductCartbyIdItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartShopAProduct);

