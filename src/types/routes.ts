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
  EDIT: "edit/:id",
  ADD: "add",
  CATEDORY: "/category",
  BORROW: "/borrow",
  LOGIN: "/login",
  USER: "/user",
}