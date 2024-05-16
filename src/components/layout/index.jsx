import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoBitStorm from "../../assets/images/LogoBitStorm.svg";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  AudioOutlined,
  MessageFilled,
  MailFilled,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Input, Space } from "antd";
const { Header, Sider, Content } = Layout;

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const LayoutAdmin = ({ main }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        margin: "5px",
        padding: "2px",
      }}
    >
      <Sider
        style={{
          padding: "10px",
          borderRadius: "10px",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical">
          <img src={LogoBitStorm} alt="BitStorm Logo" />
        </div>
        <Menu
          style={{
            padding: "10px",
            gap: "30px",
            height: "1000vh !important",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/posts">Posts</Link>,
            },
            {
              key: "3",
              icon: <MessageFilled />,
              label: <Link to="/comments">Comments</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to="/user">User</Link>,
            },
            {
              key: "5",
              icon: <UserOutlined />,
              label: <Link to="/expert">Expert</Link>,
            },
            {
              key: "6",
              icon: <MailFilled />,
              label: <Link to="/contact">Contact</Link>,
            },
            {
              key: "7",
              icon: <UploadOutlined />,
              label: <Link to="/logout">Logout</Link>,
            },
            {
              key: "8",
              icon: <LoginOutlined />,
              label: <Link to="/signin">Sign In</Link>,
            },
            {
              key: "9",
              icon: <LogoutOutlined />,
              label: <Link to="/signup">Sing Up</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#fff",
            height: "100px",
            padding: 10,
            background: colorBgContainer,
            display: "flex",
            gap: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              display: "flex",
              width: "50%",
            }}
            className="title"
          >
            <h1>Hi admin!</h1>
          </div>
          <Search
            style={{
              backgroundColor: "#1677ff",
              borderRadius: "10px",
            }}
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {main}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
