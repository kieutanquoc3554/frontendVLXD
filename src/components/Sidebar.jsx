import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  DropboxOutlined,
  ProductOutlined,
  LinkOutlined,
  UserOutlined,
  InboxOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FaMoneyBillWave } from "react-icons/fa";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useContext(ThemeContext);

  const menuItems = [
    {
      key: "category",
      icon: <AppstoreOutlined />,
      label: "Danh mục",
      children: [
        {
          key: "1",
          icon: <ProductOutlined />,
          label: <Link to="/products">Sản phẩm</Link>,
        },
        {
          key: "2",
          icon: <DropboxOutlined />,
          label: <Link to="/categories">Danh mục sản phẩm</Link>,
        },
        {
          key: "3",
          icon: <LinkOutlined />,
          label: <Link to="/suppliers">Nhà cung cấp</Link>,
        },
        {
          key: "4",
          icon: <UserOutlined />,
          label: <Link to="/customer">Khách hàng</Link>,
        },
        {
          key: "5",
          icon: <InboxOutlined />,
          label: <Link to="/inventory">Kho hàng</Link>,
        },
        {
          key: "6",
          icon: <UserOutlined />,
          label: <Link to="/employee">Nhân viên</Link>,
        },
      ],
    },
    {
      key: "orders",
      icon: <ShoppingCartOutlined />,
      label: "Giao dịch",
      children: [
        {
          key: "7",
          icon: <FormOutlined />,
          label: <Link to="/order">Đơn hàng</Link>,
        },
        {
          key: "8",
          icon: <FaMoneyBillWave />,
          label: <Link to="/bill">Danh sách hoá đơn</Link>,
        },
        {
          key: "9",
          label: <Link to="/debt">Công nợ</Link>,
        },
      ],
    },
    {
      key: "reports",
      icon: <BarChartOutlined />,
      label: "Báo cáo & Thống kê",
      children: [
        {
          key: "10",
          label: "Doanh thu",
        },
        {
          key: "11",
          label: "Hàng tồn kho",
        },
      ],
    },
    {
      key: "12",
      icon: <SettingOutlined />,
      label: "Cấu hình hệ thống",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      width={260}
      style={{
        height: "100vh",
        background: theme === "dark" ? "#121212" : "white",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Menu
        theme={theme === "dark" ? "dark" : "light"}
        mode="inline"
        defaultOpenKeys={["category", "orders", "reports"]}
        style={{
          borderRight: "none",
          background: theme === "dark" ? "#121212" : "white",
        }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
