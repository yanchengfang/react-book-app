// 定义路由类型
export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  name: string;
  protected?: boolean;
}

// 定义应用路由
export const ROUTES = {
  HOME: "/",
  BOOK: "/book",
  BOOKADD: "/book/add",
  CATEDORY: "/category",
  BORROW: "/borrow",
  BORROWADD: "/borrow/add",
  LOGIN: "/login",
  USER: "/user",
  USERADD: "/user/add"
}