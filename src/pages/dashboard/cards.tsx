import Product from "./card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./cards.css";
import { Pagination } from "antd";

const Products: React.FC = () => {
  const { user, currency }: any = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sign, setSign] = useState("$");

  useEffect(() => {
    const getData = async () => {
      const data: any = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all?PageNumber=${currentPage}&PageSize=4`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setProducts(data.data.resultData.data);
    };
    getData();
  }, [currentPage]);

  useEffect(() => {
    if (currency.currentCurrency.code === "USD") setSign("$");
    else if (currency.currentCurrency.code === "GBP") setSign("£");
    else if (currency.currentCurrency.code === "EUR") setSign("€");
  }, [currency]);

  return (
    <div>
      <div className="products">
        {products &&
          products.map((product: any) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.shortDescription}
              price={
                (product.price * currency.currentCurrency.exchangeRate).toFixed(
                  2
                ) + ` ${sign}`
              }
              image={"data:image/png;base64," + product.base64Image}
            />
          ))}
      </div>
      <Pagination
        onChange={(page) => setCurrentPage(page)}
        total={30}
        current={currentPage}
      />
    </div>
  );
};

export default Products;
