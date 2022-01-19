import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import {
  AppstoreOutlined,
  CloudOutlined,
  ShopOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";
import Title from "antd/lib/typography/Title";
/* function */
const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      title: "Home",
      icon: <AppstoreOutlined />,
      link: "/",
    },
    {
      id: 2,
      title: "Crypto Currencies",
      icon: <CloudOutlined />,
      link: "/currencies",
    },
    {
      id: 3,
      title: "Exchanges",
      icon: <ShopOutlined />,
      link: "/exchanges",
    },
    {
      id: 4,
      title: "News",
      icon: <VideoCameraOutlined />,
      link: "/news",
    },
  ];
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={250}
    >
      <div className="logo">
        <img src={Logo} alt="Logo" />
        <Title level={4} className="logo-title">
          Cryptoverse
        </Title>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.id} icon={item.icon}>
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
