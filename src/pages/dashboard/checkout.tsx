import { Button, Form, Radio, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import IBankAccount from "../../main/interfaces/IBankAccount";
import { clearCart } from "../../main/store/stores/cart/cart.store";
import "./checkout.css";

const CheckOut: React.FC = () => {
  const { user, cart, currency }: any = useSelector((state) => state);
  const [bankAccount, setBankAccount] = useState<IBankAccount>();
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://localhost:5001/api/client/${user.id}/bankAccount`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setBankAccounts(data.data.resultData.data);
    };
    getData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "https://localhost:5001/api/banktransaction",
        {
          bankAccountId: bankAccount.id,
          action: 1,
          amount: cart.cartTotalAmount,
          description: new Date().toLocaleString(),
          isActive: true,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        if (bankAccount.balance < cart.cartTotalAmount) {
          toast.error(
            `You need ${(cart.cartTotalAmount - bankAccount.balance).toFixed(
              2
            )} more to make this purchase!`,
            { position: "bottom-right" }
          );
        } else if (res.data.status === true) {
          toast.success("Your purchase was successful", {
            position: "bottom-right",
          });
          dispatch(clearCart());
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="checkout">
      <div className="checkout__orders">
        <h6> Order Summary</h6>
        <p id="checkout__description">Check your selected items</p>
        <div className="checkout__ordersDetails">
          {cart.cartItems &&
            cart.cartItems.map((cartItem: any) => (
              <div className="checkout__ordersDetail">
                <div className="checkout__img">
                  <img
                    src={
                      "data:image/png;base64," + cartItem.product.base64Image
                    }
                  />
                </div>
                <div className="checkout__desc">
                  <h6>{cartItem.product.name}</h6>
                  <h6>
                    {(
                      cartItem.product.price *
                      currency.currentCurrency.exchangeRate
                    ).toFixed(2)}
                  </h6>
                </div>
                <div className="checkout__quantity">
                  <h6>Quantity</h6>
                  <h6>{cartItem.cartQuantity}</h6>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="checkout__details">
        <h6>Payment Details</h6>
        <Form>
          <p id="checkout__description">
            Complete your purchase by providing your payment details order.
          </p>
          <p>Choose your Bank Account</p>
          <Form.Item>
            <Radio.Group
              onChange={(e) => setBankAccount(e.target.value)}
              value={bankAccount}
            >
              <Space direction="vertical">
                {bankAccounts.map((bankAcount: IBankAccount) => (
                  <Radio value={bankAcount}>{bankAcount.name}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>

          <div className="checkout__total">
            <h6>Total</h6>
            <h6>{cart.cartTotalAmount.toFixed(2)}</h6>
          </div>

          <Button
            type="primary"
            onClick={handleSubmit}
            className="checkout__btn"
          >
            Pay {cart.cartTotalAmount.toFixed(2)}
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CheckOut;
