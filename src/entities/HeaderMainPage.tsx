import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../styles/Header.css';

export default function HeaderMainPage({
  collapsed,
  setCollapsed,
  screenWidth,
}: {
  headerText: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  screenWidth: number;
}) {
  return (
    <p className='headerStyle__row'>
      <img alt='лого' src='src/shared/VTB_logo_ru.png' />
      <div>Персональный помощник </div>
      {screenWidth < 600 ? (
        <Button
          type='text'
          icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setCollapsed((prev) => !prev)}
          style={{
            fontSize: '16px',
            width: 60,
            height: 60,
            margin: '0 0 0 auto',
            color: '#002882',
          }}
        />
      ) : null}
      {/* <div className='headerStyle_ColWithSearchButton'>
        <Button className='headerStyle_SearchButton'>Поиск</Button>
      </div> */}
    </p>
  );
}
