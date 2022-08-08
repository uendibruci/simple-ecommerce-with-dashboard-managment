import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header1 from "./header";
import Product from "./card";
import "./category.css";
import { Breadcrumb, Pagination } from "antd";

const Category: React.FC = () => {
  const { user, currency }: any = useSelector((state) => state);
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data: any = await axios.get(
        `https://localhost:5001/api/product/get-all`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setProducts(data.data.resultData.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data: any = await axios.get(
        `https://localhost:5001/api/category/${id}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      setCategory(data.data.resultData);
    };
    getData();
  }, []);

  return (
    <div>
      <Header1 />
      <div className="category">
        <div className="category__title">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Category</Breadcrumb.Item>
            <Breadcrumb.Item>{category.description}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="category__products">
          {products
            .filter((product: any) => product.categoryId == id)
            .map((filterProduct: any) => (
              <>
                <Product
                  key={filterProduct.id}
                  id={filterProduct.id}
                  title={filterProduct.name}
                  description={filterProduct.shortDescription}
                  price={(
                    filterProduct.price * currency.currentCurrency.exchangeRate
                  ).toFixed(2)}
                  image={"data:image/png;base64," + filterProduct.base64Image}
                />
              </>
            ))}
        </div>
        <Pagination
          onChange={(page) => setCurrentPage(page)}
          current={currentPage}
          total={10}
        />
      </div>
    </div>
  );
};

export default Category;
