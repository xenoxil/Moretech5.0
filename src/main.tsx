import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GPTVersion from './pages/GPTVersion.tsx';
import Authorization from './pages/Reglog.tsx';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authorization />,
  },
  {
    path: '/main',
    element: <GPTVersion />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'VTBGroupUI-Regular !important',
      },
    }}>
    <RouterProvider router={router} />
  </ConfigProvider>,
);
