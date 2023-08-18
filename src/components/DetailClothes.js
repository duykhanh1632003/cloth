import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "react-image-lightbox"; // Make sure you've imported the react-image-lightbox package
import "react-image-lightbox/style.css"; // Import the styles for the lightbox
import { getItemHomePage } from "../service/userService";
import "./DetailClothes.scss";
import ReactMarkdown from "react-markdown";
import { handleAddToBag } from "../service/userService";

const DetailClothes = () => {
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const itemData = await getItemHomePage();
      setData(itemData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const item = data.find(item => item.id.toString() === id);
    if (item) {
      setDataItem(item);
    }
  }, [id, data]);

  const openPreviewImage = () => {
    setPreviewImageUrl(dataItem.image);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setPreviewImageUrl("");
  };

  let handleSizeSelect = (size)=>{
    console.log(`Selected size: ${size}`);
  }

  const handleAddBag =async () =>{
    let data=  {}
    data.name = dataItem.name
    data.idUser = parseInt(dataItem.idAdmin);

    data.currentNumber = dataItem.count - dataItem.currentNumer
    data.idItem = dataItem.id
    data.numerWantBuy = 1
    data.price = dataItem.priceItem
    data.totalMoneyCart = dataItem.priceItem
    await handleAddToBag(data)  
  }

  return (
    <div className="container-detail-cloth">
      <div className="detail-cloth">
        <div
          className="col-md-3"
          key={dataItem.id}
          onClick={openPreviewImage}
        >
          <div className="image-item">
            <img src={dataItem.image} alt="Clothes" />
          </div>
        </div>
        <div className="text-content">
        <div className="name-item">{dataItem.name}</div>
              <div className="price-item">
                {dataItem.sale > 0 ? (
                  <>
                    <div className="sale-price">{dataItem.sale}% OFF</div>
                    
                    <div className="main-price">
                    {dataItem.priceItem + ".000đ"}
                  </div>
                  <div className="price-after-reduce">
                      {(
                        dataItem.priceItem -
                        (dataItem.priceItem * dataItem.sale) / 100
                      ).toFixed(0) + ".000đ"}
                    </div>
                  </>
                ) : (
                  <div className="main-price-not-sale">
                    {dataItem.priceItem + ".000đ"}
                  </div>
                )}
                
              </div>
                <div className="select">
              <div className="select-text">please select size</div>
              <div className="button-select">
              <button onClick={() => handleSizeSelect("S")}><span>S</span></button>
              <button onClick={() => handleSizeSelect("M")}><span>M</span></button>
              <button onClick={() => handleSizeSelect("L")}><span>L</span></button>

              </div>
              </div>
              <div className="add-cart">
                  <button onClick={() => handleAddBag()}>add to bag</button>
                  <button>help me!</button>
              </div>
              <div
                  dangerouslySetInnerHTML={{
                    __html: dataItem.contentHTML,
                  }}
                ></div>


        </div>
      </div>
      {isLightboxOpen && (
        <Lightbox
          mainSrc={previewImageUrl}
          onCloseRequest={handleLightboxClose}
        />
      )}
    </div>
  );
};

export default DetailClothes;
