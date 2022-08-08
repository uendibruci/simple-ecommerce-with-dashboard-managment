import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user/user.store";
import navigationStore from "../stores/navigation/navigation.store";
import productsStore from "../stores/products/products.store";
import cartStore from "../stores/cart/cart.store";
import currencyStore from "../stores/currency/currency.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  products: productsStore.reducer,
  cart: cartStore.reducer,
  currency: currencyStore.reducer,
});

export default rootReducer;
