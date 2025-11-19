import type { UserLoginType } from "../../types";
import request from "../../utils/request";
import Icon from "@ant-design/icons";
import { Button, Form, Input, message, Image } from "antd";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export default function Login() {
  const router = useNavigate();
  const onFinish = async (values: UserLoginType) => {
    try {
      const res = await request.post("/api/login", values);
      console.log(
        "%c [ res ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        res
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      message.success("登陆成功");

      router("/book");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          图书管理系统
        </header>
        <div className={styles.form}>
          <Form
            name="basic"
            initialValues={{ name: "", password: "" }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="name"
              label={<span className={styles.label}>账号</span>}
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" autoComplete="username" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className={styles.label}>密码</span>}
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password placeholder="请输入密码" autoComplete="current-password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={classnames(styles.btn, styles.loginBtn)}
                size="large"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  );
}
