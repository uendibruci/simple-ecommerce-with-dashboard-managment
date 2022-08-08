import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type SizeType = Parameters<typeof Form>[0]["size"];

const BankAccount: React.FC = () => {
  const { user }: any = useSelector((state) => state);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "https://localhost:5001/api/bankaccount",
        {
          code,
          name,
          currencyId: currency,
          balance,
          clientId: user.id,
          isActive: true,
        },
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === true) {
          toast.success("Bank Account successfully created!", {
            position: "bottom-right",
          });
        } else {
          toast.error(`${res.data.message}`, { position: "bottom-right" });
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Form>
        <Form.Item rules={[{ required: true }]}>
          <label>Bank Account Code</label>
          <Input onChange={(e) => setCode(e.target.value)} value={code} />
        </Form.Item>
        <Form.Item>
          <label>Bank Account Name</label>
          <Input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
        </Form.Item>
        <Form.Item>
          <label>Currency</label>
          <Select
            onChange={(e: any) => {
              setCurrency(e);
            }}
            value={currency}
          >
            <Select.Option value="7">USD</Select.Option>
            <Select.Option value="8">EURO</Select.Option>
            <Select.Option value="9">GBP</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <label>Balance</label>
          <Input
            onChange={(e) => setBalance(e.target.value)}
            value={balance}
            required
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BankAccount;
