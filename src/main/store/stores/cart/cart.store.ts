import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [] as any,
  cartTotalQuantity: 0 as any,
  cartTotalAmount: 0,
};

const cartStore = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<any>) => {
      const existingIndex = state.cartItems.findIndex(
        (item: any) => item.product.id === payload.product.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.success(`${payload.product.name} added to cart`, {
          position: "bottom-right",
        });
        // state.cartItems[existingIndex].cartAmount =
        //   state.cartItems[existingIndex].cartQuantity *
        //   state.cartItems[existingIndex].product.price;
      } else {
        let tempProductItem = { ...payload };
        state.cartItems.push(tempProductItem);
        toast.success(`${payload.product.name} added to cart`, {
          position: "bottom-right",
        });
      }
    },

    removeFromCart(state, { payload }) {
      state.cartItems.map((cartItem: any) => {
        if (cartItem.product.id === payload.product.id) {
          const nextCartItems = state.cartItems.filter(
            (item: any) => item.product.id !== payload.product.id
          );

          state.cartItems = nextCartItems;
          toast.error(`${payload.product.name} removed from cart`, {
            position: "bottom-right",
          });
        }
      });
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal: any, cartItem: any) => {
          const { cartQuantity, cartAmount } = cartItem;
          //const itemTotal = cartItem.product.price * cartQuantity;
          cartTotal.total += cartAmount;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },

    clearCart(state) {
      state.cartItems = [];
      toast.error("Cart cleared", { position: "bottom-right" });
    },
  },
});

export default cartStore;

export const { addToCart, getTotals, removeFromCart, clearCart } =
  cartStore.actions;
