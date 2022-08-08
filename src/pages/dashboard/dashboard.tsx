import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Products from "./cards";
import Header1 from "./header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ICategory from "../../main/interfaces/ICategory";

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user }: any = useSelector((state) => state);
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: any = await axios.get(
        `https://localhost:5001/api/category/get-all`,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setCategory(data.data.resultData.data);
    };
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" style={{ marginTop: "30px" }}>
          <Menu.SubMenu title="My Account" icon={<UserOutlined />}>
            <Menu.Item onClick={() => navigate("/profiledetails")}>
              My Details
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/transactions")}>
              My Transactions
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key={2} title="Category" icon={<MenuOutlined />}>
            {category &&
              category.map((cat: any) => (
                <Link to={`/category/${cat.id}`}>
                  <Menu.Item key={cat.id}>{cat.description}</Menu.Item>
                </Link>
              ))}
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header1 hideBackButton />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Products />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
