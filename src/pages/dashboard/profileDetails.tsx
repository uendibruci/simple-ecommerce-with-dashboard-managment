import { Avatar, Breadcrumb, Button, Card, Drawer } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header1 from "./header";
import "./profileDetails.css";
import IBankAccount from "../../main/interfaces/IBankAccount";
import BankAccount from "./bankAccount";

const ProfileDetails: React.FC = () => {
  const { user }: any = useSelector((state) => state);
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const [visible, setVisible] = useState(false);
  const [currency, setCurrency] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://localhost:5001/api/bankaccount/get-all`,
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    bankAccounts.map((bankAccount) => {
      if (bankAccount.currencyId === 7) setCurrency("USD");
      else if (bankAccount.currencyId === 8) setCurrency("EURO");
      else if (bankAccount.currencyId === 9) setCurrency("GBP");
    });
  }, [bankAccounts]);

  return (
    <div>
      <Header1 />
      <div className="profileDetails">
        <div className="profileDetails__title">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>My Account</Breadcrumb.Item>
            <Breadcrumb.Item>My Details</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="profileDetails__content">
          <h5>Personal Information</h5>
          <Card>
            <Card.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{user.username}</a>}
            />
            <div className="card__detail">
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </Card>
          <hr />
          <div className="bankAccount">
            <h5>Bank Accounts</h5>
            {bankAccounts
              .filter(
                (bankAccount: IBankAccount) => bankAccount.clientId === user.id
              )
              .map((filterBankAccount: IBankAccount) => (
                <Card>
                  <Card.Meta
                    title={
                      <a href="https://ant.design">{filterBankAccount.name}</a>
                    }
                  />
                  <div className="card__detail">
                    <p>Id: {filterBankAccount.id}</p>
                    <p>Code: {filterBankAccount.code}</p>
                    <p>Balance: {filterBankAccount.balance}</p>
                  </div>
                </Card>
              ))}

            <Button className="bankAccount__btn" onClick={showDrawer}>
              Add a New Bank Account
            </Button>
            <Drawer
              title="Add a New Bank Account"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <BankAccount />
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
