import { createBrowserRouter, Navigate } from "react-router-dom"
import { ROUTES } from '../types/routes'
import App from '../App.tsx'
import Book from '@/pages/Book'
import BookAdd from '@/pages/Book/add'
import Borrow from '@/pages/Borrow'
import BorrowAdd from '@/pages/Borrow/add'
import Login from '@/pages/Login'
import Category from '@/pages/Category'
import User from '@/pages/User'
import UserAdd from '@/pages/User/add'



// ?模拟用户认证状态
// const isAuthenticated = () => {
//   // 实际应用中这里会检查用户登录状态
//   return localStorage.getItem('isLoggedIn') === 'true';
// };

// ?保护路由组件
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to={ROUTES.LOGIN} replace />;
//   }
//   return children;
// };

// *路由配置
const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.BOOK,
        children: [
          {
            path: ROUTES.BOOK,
            element: <Book />,
          },
          {
            path: ROUTES.BOOKADD,
            element: <BookAdd />,
          }
        ]
      },
      {
        path: ROUTES.BORROW,
        children: [
          {
            path: ROUTES.BORROW,
            element: <Borrow />,
          },
          {
            path: ROUTES.BORROWADD,
            element: <BorrowAdd />,
          }
        ]
      },
      {
        path: ROUTES.CATEDORY,
        element: <Category />
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />
      },
      {
        path: ROUTES.USER,
        children: [
          {
            path: ROUTES.USER,
            element: <User />,
          },
          {
            path: ROUTES.USERADD,
            element: <UserAdd />,
          }
        ]
      },
      {
        path: "*",
        element: <Navigate to={ROUTES.HOME} replace />
      }
    ]
  }
]);
export default router;