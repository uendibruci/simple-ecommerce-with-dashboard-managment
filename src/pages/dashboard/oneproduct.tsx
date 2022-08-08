import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, getTotals } from "../../main/store/stores/cart/cart.store";

import Header1 from "./header";
import { Button, Card, Drawer } from "antd";
import "./oneproduct.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import CheckOut from "./checkout";

const OneProduct: React.FC = () => {
  const { id } = useParams();
  const { user, cart, currency }: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [product, setProduct]: any = useState([]);
  const [count, setCount]: any = useState(1);
  const [sign, setSign] = useState("$");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const getData = async () => {
        const data: any = await axios.get(
          `https://localhost:5001/api/product/${id}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(data.data.resultData);
        setProduct(data.data.resultData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleButton = () => {
    dispatch(
      addToCart({
        product,
        cartQuantity: count,
        cartAmount:
          count * product.price * currency.currentCurrency.exchangeRate,
      })
    );
  };

  useEffect(() => {
    if (currency.currentCurrency.code === "USD") setSign("$");
    else if (currency.currentCurrency.code === "GBP") setSign("£");
    else if (currency.currentCurrency.code === "EUR") setSign("€");
  }, [currency]);

  // useEffect(() => {
  //   dispatch(
  //     addToCart({
  //       cartAmount:
  //         count * product.price * currency.currentCurrency.exchangeRate,
  //     })
  //   );
  // }, [currency.currentCurrency]);

  const handleDecrement = () => {
    count > 1 ? setCount(count - 1) : setCount(1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Header1 />
      <div className="wrapper">
        <div className="img__container">
          <img src={"data:image/png;base64," + product.base64Image} />
        </div>

        <div className="info__container">
          <div className="title">
            <h1>{product.name}</h1>
          </div>
          <div className="shortDesc">
            <h5>{product.shortDescription}</h5>
          </div>
          <div className="longDesc">
            <p>{product.longDescription}</p>
          </div>
          <div className="info__price">
            <p>
              {(product.price * currency.currentCurrency.exchangeRate).toFixed(
                2
              ) + ` ${sign}`}
            </p>
          </div>
          <div className="add__container">
            <div className="quantity">
              <IconButton onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
              <span className="amount">{count}</span>
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </div>
            <div className="buttons">
              <Button
                onClick={handleButton}
                id="button__addToCart"
                type="primary"
              >
                Add to Cart
              </Button>
              <Button onClick={showDrawer} id="button__buy" type="primary">
                Buy it now
              </Button>
              <Drawer
                title="Check Out"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <CheckOut />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OneProduct;
