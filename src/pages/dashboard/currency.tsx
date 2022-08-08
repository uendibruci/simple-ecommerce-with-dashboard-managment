import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrency,
  setcurrentCurrency,
} from "../../main/store/stores/currency/currency.store";

const Currency: React.FC = () => {
  const { user, currency }: any = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data: any = await axios.get(
        `https://localhost:5001/api/currency/get-all`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      data.data.resultData.data.forEach((currency: any) => {
        if (
          currency.code === "EUR" ||
          currency.code === "GBP" ||
          currency.code === "USD"
        ) {
          dispatch(setCurrency(currency));
        }
      });
    };
    getData();
  }, []);

  const handleMenuClick = (e: any) => {
    console.log("click", e);
    if (e.key === "1") {
      dispatch(
        setcurrentCurrency(
          currency.currencies.find((curr: any) => curr.code === "USD")
        )
      );
    } else if (e.key === "2") {
      dispatch(
        setcurrentCurrency(
          currency.currencies.find((curr: any) => curr.code === "GBP")
        )
      );
    }
    if (e.key === "3") {
      dispatch(
        setcurrentCurrency(
          currency.currencies.find((curr: any) => curr.code === "EUR")
        )
      );
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        onClick={(e) => {}}
        key={1}
        icon={
          <ReactCountryFlag
            countryCode="US"
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title="US"
          />
        }
      >
        USD
      </Menu.Item>
      <Menu.Item
        key={2}
        icon={
          <ReactCountryFlag
            countryCode="GB"
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title="GB"
          />
        }
      >
        GBP
      </Menu.Item>
      <Menu.Item
        key={3}
        icon={
          <ReactCountryFlag
            countryCode="EU"
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title="EU"
          />
        }
      >
        EUR
      </Menu.Item>
    </Menu>
  );

  return (
    <Space wrap>
      <Dropdown.Button
        overlay={menu}
        placement="bottom"
        icon={<DownOutlined />}
      >
        {currency.currentCurrency.code}
      </Dropdown.Button>
    </Space>
  );
};

export default Currency;
