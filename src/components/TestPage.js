import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItemHomePage } from "../service/userService";
import "./HomePage";

function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

const TestPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const itemData = await getItemHomePage();
      setData(itemData);
    }
    fetchData();
  }, []);

  return (
    <div className="container-homepage">
      <div className="homepage-row">
        {data.map((item) => (
          <div className="col-md-3" key={item.id}>
            <Link to={`/products/${convertToSlug(item.name)}/${item.id}`} className="image-item">
              <div
                className="img"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
            </Link>
            <div className="text">
              <div className="name-item">{item.name}</div>
              <div className="price-item">
                {item.sale > 0 ? (
                  <>
                    <div className="sale-price">-{item.sale}%</div>
                    <div className="price-after-reduce">
                      {(
                        item.priceItem -
                        (item.priceItem * item.sale) / 100
                      ).toFixed(0) + ".000đ"}
                    </div>
                    <div className="main-price">
                    {item.priceItem + ".000đ"}
                  </div>
                  </>
                ) : (
                  <div className="main-price-not-sale">
                    {item.priceItem + ".000đ"}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
