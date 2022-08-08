import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import AuthManager from "../../main/utils/authManager";
import { ArrowLeftOutlined, ShoppingTwoTone } from "@ant-design/icons";
import { setUser } from "../../main/store/stores/user/user.store";
import { navigateTo } from "../../main/store/stores/navigation/navigation.store";
import "./header.css";
import Currency from "./currency";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Header1 = ({ hideBackButton = false }) => {
  const dispatch = useDispatch();
  const { cart }: any = useSelector((state) => state);
  const onLogout = async () => {
    dispatch(setUser(null));
    AuthManager.logout();
    dispatch(navigateTo("/login"));
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, backgroundColor: "white" }}
    >
      {!hideBackButton ? (
        <>
          <div className="header__left">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="back__button" />
            </IconButton>
          </div>
          <div className="header__right">
            <Currency />
            <IconButton onClick={handleClick}>
              <ShoppingTwoTone twoToneColor="#f7a440" id="shopping__cart" />
              <span id="cart__quantity">{cart.cartTotalQuantity}</span>
            </IconButton>

            <Button id="button__logout" type="primary" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="header__left">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="back__buttonHidden" />
            </IconButton>
          </div>
          <div className="header__right">
            <Currency />
            <IconButton onClick={handleClick}>
              <ShoppingTwoTone twoToneColor="#f7a440" id="shopping__cart" />
              <span id="cart__quantity">{cart.cartTotalQuantity}</span>
            </IconButton>

            <Button id="button__logout" type="primary" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        </>
      )}
    </Header>
  );
};

export default Header1;
