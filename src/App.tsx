import { Outlet } from 'react-router-dom';
import LayoutMain from '@/components/Layout';
import './App.css'

const App = () => {
  return (
    <div className="app">
      <LayoutMain>
        <Outlet />{/* 子路由在这里渲染 */}
        {/* <footer className="footer">
          <p>© 2023 Vite + React + TypeScript 路由示例</p>
        </footer> */}
      </LayoutMain>
    </div>
  );
};

export default App;