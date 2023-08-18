// import './DetailItem.scss';
import React, { Component } from "react";
import "./DetailItem.scss";
import {
  handleLoginApi,
  createNewUserData,
  getDetailUser,
  handleEditAUser,
  handleOnChangeDetailItem,
  handleDeleteAItem
} from "../service/userService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import CommonUtils from "../components/ultils/CommonUtils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { handleSubmitDetailItem } from "../service/userService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; //
import { getItemHomePage } from "../service/userService";

const mdParser = new MarkdownIt();
class DetailItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idItem: "",
      name: "",
      price: "",
      sale: "",
      previewImageUrl: "",
      avatar: "",
      isOpen: false,
      contentMarkdown: "",
      contentHTML: "",
      currentNumer: "",
      count: "",
      isLightboxOpen: false,
      getAllItem: [],
      isEdit : false,
      didMount: false
    };
  }


  async componentDidMount() {
    let response = await getItemHomePage();
    console.log("check res", response);
    this.setState({
      getAllItem: response,
    });
  }


  handleEditorChange = ({ text, html }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    console.log("this state", this.state);
  };

  handleOnchangImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    const objectUrl = URL.createObjectURL(file);
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  

  handleLightboxOpen = () => {
    this.setState({ isLightboxOpen: true });
  };

  handleLightboxClose = () => {
    this.setState({ isLightboxOpen: false });
  };

  openPreviewImage = () => {
    if (!this.state.previewImageUrl) {
      return;
    }
    this.setState({
      isLightboxOpen: true,
    });
  };

  handleOngChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubMitForm = async (e) => {
    e.preventDefault();
    let data = {};
    let {
      idItem,
      name,
      price,
      sale,
      avatar,
      contentMarkdown,
      contentHTML,
      count,
      currentNumer,
      isEdit
    } = this.state;
    data.id = localStorage.getItem("id");
    data.idItem = idItem
    data.name = name;
    data.price = price;
    data.sale = sale;
    data.avatar = avatar;
    data.contentMarkdown = contentMarkdown;
    data.contentHTML = contentHTML;
    data.count = count;
    data.currentNumer = currentNumer;
    let response
    if(isEdit === false){
       response = await handleSubmitDetailItem(data);
    }
    else{
      response = await handleOnChangeDetailItem(data)
    }
    if (response && response.errCode === 0) {
      this.setState({
        idItem:"",
        name: "",
        price: "",
        sale: "",
        avatar: "",
        contentHTML: "",
        contentMarkdown: "",
        previewImageUrl: "",
        count: "",
        currentNumer: "",
      });
      NotificationManager.success("Đã lưu sản phẩm thành công", "Thành công");
      let updatedItemList = await getItemHomePage();
      this.setState({
        getAllItem: updatedItemList,
      });
    } else {
      NotificationManager.error("Có lỗi xảy ra. Vui lòng thử lại sau.", "Lỗi");
    }
  };

  handleEditorChange = ({ text, html }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSelectChange = (event) => {
  const selectedItemId = event.target.value;
    console.log("Check select",selectedItemId)
  let {getAllItem } =this.state
  getAllItem.map((item, index) =>{
    if(item.name === selectedItemId){
      this.setState({
        idItem : item.id,
        name: item.name,
        price: item.priceItem,
        sale: item.sale,
        count: item.count,
        currentNumer: item.currentNumer,
        sale: item.sale,
        contentHTML : item.contentHTML,
        contentMarkdown: item.contentMarkdown,
        previewImageUrl: item.image,
        isEdit: true
      })
    }
  })
};

handleDeleteItem =async () =>{
  let { idItem } = this.state
  let response = handleDeleteAItem(idItem)
  if(response) {
    NotificationManager.success("Xóa thành công");
    let updatedItemList = await getItemHomePage();
  this.setState({
    getAllItem: updatedItemList,
  });

  }
  else{
    NotificationManager.error("Không thành công");

  }
}

  render() {
    let { getAllItem , isEdit } = this.state;
    console.log("Check id ", localStorage.getItem("id"));
    return (
      <div className="container">
        <div className="title-have-item">Sản phẩm bạn đã có</div> 
        <div className="col-6 price-item title-button-select">
        <select className="custom-select" onClick={this.handleSelectChange}>
            {getAllItem &&
              getAllItem.length > 0 &&
              getAllItem.map((item, index) => {
                if (item.idAdmin === localStorage.getItem("id")) {
                  return <option key={index}>{item.name}</option>;
                }
              })}
          </select>
          {isEdit && <button type="button" class="btn btn-danger" onClick={() => this.handleDeleteItem()}>Delete</button>}
        </div>
        <div className="title-header">Tạo sản phẩm của bạn</div>
        <div className="row">
          <div className="col-9">
            <div className="col-12 title-item">
              <label className="name-input">Tên sản phẩm</label>
              <input
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleOngChangeInput(e)}
              />
            </div>
            <div className="col-6 price-item">
              <label className="name-input">Giá sản phẩm (nghìn vnđ) </label>
              <input
                value={this.state.price}
                name="price"
                onChange={(e) => this.handleOngChangeInput(e)}
              />
            </div>
            <div className="col-6 price-item">
              <label className="name-input">Số lượng hàng </label>
              <input
                value={this.state.count}
                name="count"
                onChange={(e) => this.handleOngChangeInput(e)}
              />
            </div>
            <div className="col-6 price-item">
              <label className="name-input">Số lượng hàng đã bán</label>
              <input
                value={this.state.currentNumer}
                name="currentNumer"
                onChange={(e) => this.handleOngChangeInput(e)}
              />
            </div>
            <div className="col-6 sale-item">
              <label className="name-input">Giảm giá %</label>
              <input
                value={this.state.sale}
                name="sale"
                onChange={(e) => this.handleOngChangeInput(e)}
              />
            </div>
          </div>

          <div className="group col-3 update-avatar">
            <label htmlFor="inputZip">Ảnh sản phẩm</label>
            <div className="preview-img-container">
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnchangImage(event)}
              />
              <label className="label-upload" htmlFor="previewImg">
                Tải ảnh <i className="mdi mdi-upload"></i>
              </label>
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImageUrl})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
        </div>
        {this.state.isLightboxOpen && (
          <Lightbox
            mainSrc={this.state.previewImageUrl}
            onCloseRequest={this.handleLightboxClose}
          />
        )}
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          value={this.state.contentMarkdown}
          onChange={this.handleEditorChange}
        />

        <button
          type="button"
          onClick={(e) => this.handleSubMitForm(e)}
          class="btn btn-success"
          style={{ margin: " 0 0 20px 0" }}
        >
          Submit
        </button>

        <NotificationContainer />
      </div>
    );
  }
}

export default DetailItem;
