import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoBitStorm from "../../assets/images/LogoBitStorm.webp";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  AudioOutlined,
  MessageFilled,
  MailFilled,
  LoginOutlined,
  PayCircleOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Input,
  Avatar,
  Badge,
  Space,
  Modal,
} from "antd";
import axios from "axios";
import { API_URL } from "../../utils/helpers";
import DemoAvatar from "../user/DemoAvatar";
import CustomCalendar from "./calendar";

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
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          API_URL + `/admin/admin-profile/${userInfo.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setUserProfile(response.data); // Assuming response.data contains the user profile
      } catch (error) {
        localStorage.setItem("permission", true);
        handleLogout();
      }
    };

    if (userInfo && userInfo.sub) {
      getUser();
    }
  }, [userInfo]); // Add userInfo as a dependency to re-run the effect when userInfo changes

  useEffect(() => {
    const storedToken = localStorage.getItem("__token__");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken); // Use jwtDecode
      setUserInfo(decodedToken);
    }
  }, []);

  console.log(userProfile);
  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to log out?",
      content: "Logging out will end your current session.",
      okText: "Yes, log me out",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("User logged out");
        localStorage.removeItem("__token__");
        localStorage.removeItem("expires_in");
        window.location.href = "/signin";
      },
      onCancel() {
        console.log("Logout cancelled");
      },
    });
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: <Link to="/rooms">Rooms</Link>,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: <Link to="/user">User</Link>,
    },

    {
      key: "4",
      icon: <MailFilled />,
      label: <Link to="/contact">Contact</Link>,
    },
    {
      key: "5",
      icon: <PayCircleOutlined />,
      label: <Link to="/booking">Booking</Link>,
    },
    {
      key: "7",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

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
          items={menuItems}
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
            {token ? (
              <Space size={24}>
                <Badge count={10} style={{ display: "flex" }}>
                  {userProfile && userProfile.data.profile_picture ? (
                    <Avatar
                      shape="square"
                      src={
                        userProfile.data.profile_picture
                          ? userProfile.data.profile_picture
                          : DemoAvatar()
                      }
                    />
                  ) : (
                    <Avatar shape="square" icon={<UserOutlined />} />
                  )}
                </Badge>
                {userProfile ? (
                  <h1>{userProfile.data.name}</h1>
                ) : (
                  <h1>You need login</h1>
                )}
              </Space>
            ) : (
              <h1>You have to login</h1>
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="primary" onClick={showModal}>
              <CalendarOutlined />
            </Button>
            <Modal
              title="Calendar"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[

                <Button key="submit" type="primary" onClick={handleOk}>
                  OK
                </Button>,
              ]}
            >
              <CustomCalendar />
            </Modal>
          </div>
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
