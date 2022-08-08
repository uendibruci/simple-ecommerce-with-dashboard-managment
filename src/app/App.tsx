import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/test/login";
import DashboardPage from "../pages/dashboard/dashboard";
import Register from "../pages/test/register";
import OneProduct from "../pages/dashboard/oneproduct";
import Products from "../pages/dashboard/cards";
import Cart from "../pages/dashboard/cart";
import Category from "../pages/dashboard/category";
import ProfileDetails from "../pages/dashboard/profileDetails";
import Transactions from "../pages/dashboard/transactions";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute isPageLogin>
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <OneProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/category/:id"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/profiledetails"
          element={
            <PrivateRoute>
              <ProfileDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
