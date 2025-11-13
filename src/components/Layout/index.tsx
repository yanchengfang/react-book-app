import React, { type PropsWithChildren } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Breadcrumb, Layout as AntdLayout, Menu, theme, Dropdown, Space } from 'antd';
import type { couldHasProps } from '../../types/componentTypes';
import styles from './index.module.css'
import bookLogo from '@/assets/book-logo.svg'
const { Header, Content, Sider } = AntdLayout;

const ITEMS = [
  {
    label: "图书管理",
    // icon: "",
    key: "book",
    children: [
      { label: "图书列表", key: "/book" },
      { label: "图书添加", key: "/book/add" }
    ]
  },
  {
    label: "借阅管理",
    // icon: "",
    key: "borrow",
    children: [
      { label: "借阅列表", key: "/borrow" },
      { label: "书籍借阅", key: "/borrow/add" }
    ]
  },
  {
    label: "分类管理",
    // icon: "",
    key: "/category",
  },
  {
    label: "用户管理",
    // icon: "",
    key: "user",
    children: [
      { label: "用户列表", key: "/user" },
      { label: "用户添加", key: "/user/add" }
    ]
  },
]

const USER_ITEMS: MenuProps["items"] = [
  {
    label: "用户中心",
    key: "1",
  },
  {
    label: "登出",
    key: "2",
  }
];

const LayoutMain: React.FC<PropsWithChildren> = ({children}) => {
  const router = useNavigate()
  const routerLocation = useLocation()
  const activeMenu = routerLocation.pathname
  const defaultOpenKeys = [activeMenu.split("/")[1]];
  console.log("🚀 ~ LayoutMain ~ activeMenu:", activeMenu)
  // 点击菜单跳转
  const handleMenuClick: MenuProps["onClick"] = ({key}) => {
    router(key)
    // // 可以传递状态（state）
    // navigate('/target-path', { state: { id: 1 } });
    
    // // 替换当前历史记录（而不是添加新记录）
    // navigate('/target-path', { replace: true });
    
    // // 后退
    // navigate(-1);
  }
  return (
    <>
      <AntdLayout className={styles.container}>
        <Header className={styles.header}>
          <img  className={styles.logo} src={bookLogo} />
          图书管理系统
          <span className={styles.user}>
            <Dropdown menu={{ items: USER_ITEMS }} placement="bottom">
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  用户名
                  <DownOutlined />
                </Space>
              </span>
            </Dropdown>
          </span>
        </Header>
        <AntdLayout>
          <Sider width={200}>
            <Menu
              mode="inline"
              selectedKeys={[activeMenu]}
              defaultOpenKeys={defaultOpenKeys}
              style={{ height: '100%', borderInlineEnd: 0 }}
              items={ITEMS}
              onClick={handleMenuClick}
            />
          </Sider>
          <AntdLayout>
            <Content className={styles.content}>{children}</Content>
          </AntdLayout>
        </AntdLayout>
      </AntdLayout>
    </>
  );
};

export default LayoutMain;