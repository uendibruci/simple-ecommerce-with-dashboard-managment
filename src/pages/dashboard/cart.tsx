import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header1 from "./header";
import "./cart.css";
import {
  clearCart,
  getTotals,
  removeFromCart,
} from "../../main/store/stores/cart/cart.store";
import { Button, Drawer } from "antd";
import CheckOut from "./checkout";

const Cart: React.FC = () => {
  const { cart, currency }: any = useSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart: any = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch, currency]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Header1 />
      <div className="cart__container">
        {cart.cartItems.length === 0 ? (
          <h1>Your cart is currently empty!</h1>
        ) : (
          <>
            <div className="titles">
              <h3 className="product__title">Product</h3>
              <h3 className="product__price">Price</h3>
              <h3 className="product__quantity">Quantity</h3>
              <h3 className="product__total">Total</h3>
            </div>
            <div className="cart__items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem: any) => (
                  <div className="cart__item">
                    <div className="cart__product">
                      <img
                        src={
                          "data:image/png;base64," +
                          cartItem.product.base64Image
                        }
                      />
                      <div>
                        <h3>{cartItem.product.name}</h3>
                        <p>{cartItem.product.shortDescription}</p>
                        <button onClick={() => handleRemoveFromCart(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart__productPrice">
                      {(
                        cartItem.product.price *
                        currency.currentCurrency.exchangeRate
                      ).toFixed(2)}
                    </div>
                    <div className="cart__productQuantity">
                      {cartItem.cartQuantity}
                    </div>
                    <div className="cart__totalAmount">
                      {/* {(
                        cartItem.product.price *
                        currency.currentCurrency.exchangeRate *
                        cartItem.cartQuantity
                      ).toFixed(2)} */}
                      {cartItem.cartAmount.toFixed(2)}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart__summary">
              <button onClick={handleClearCart} className="clear__btn">
                Clear Cart
              </button>
              <div className="cart__checkout">
                <div className="subtotal">
                  Subtotal: {cart.cartTotalAmount.toFixed(2)}
                </div>
                <Button onClick={showDrawer} id="checkOut__btn">
                  Check out
                </Button>
                <Drawer
                  title="Check Out"
                  placement="right"
                  onClose={onClose}
                  visible={visible}
                  width={420}
                >
                  <CheckOut />
                </Drawer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
