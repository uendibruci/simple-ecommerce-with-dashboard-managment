import { Breadcrumb, Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header1 from "./header";
import "./profileDetails.css";
import IBankAccount from "../../main/interfaces/IBankAccount";
import IBankTransaction from "../../main/interfaces/IBankTransaction";
import "./transactions.css";

const Transactions: React.FC = () => {
  const { user }: any = useSelector((state) => state);
  const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>([]);
  const [bankAccount, setBankAccount] = useState<any>([]);
  const [banktransactions, setBankTransactions] = useState<IBankTransaction[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState("");
  const [filterBankTransactions, setFilterBankTransactions] = useState<
    IBankTransaction[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://localhost:5001/api/banktransaction/get-all`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      if (selectedOption === "") setBankTransactions(data.data.resultData.data);
    };
    getData();
  }, []);

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

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://localhost:5001/api/bankaccount/${selectedOption}/transactions`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setFilterBankTransactions(data.data.resultData.data);
    };
    getData();
  }, [selectedOption]);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://localhost:5001/api/bankaccount/${selectedOption}`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setBankAccount(data.data.resultData);
    };
    getData();
  }, [selectedOption]);

  const handleOnChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <Header1 />
      <div className="transactions">
        <div className="transactions__title">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>My Account</Breadcrumb.Item>
            <Breadcrumb.Item>My Transactions</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="transactions__content">
          <h4>
            {selectedOption === ""
              ? "All transactions"
              : `Transactions from ${bankAccount.name} `}
          </h4>

          <h5>Filter by Bank Accounts: </h5>
          <select
            className="transactions__select"
            onChange={handleOnChange}
            value={selectedOption}
          >
            <option value={""}>All</option>
            {bankAccounts.map((bank: IBankAccount) => (
              <option key={bank.id} value={bank.id}>
                {bank.name}
              </option>
            ))}
          </select>

          <div className="transactions__cards">
            {filterBankTransactions.map(
              (filterbanktransaction: IBankTransaction) => (
                <Card>
                  <Card.Meta
                    title={<a href="">{filterbanktransaction.description}</a>}
                  />
                  <div className="card__detail">
                    <p>Amount: {filterbanktransaction.amount}</p>
                    <p>
                      Bank Account Id: {filterbanktransaction.bankAccountId}
                    </p>
                  </div>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
