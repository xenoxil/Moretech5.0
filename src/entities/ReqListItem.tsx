// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { BankOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
import '../styles/ReqListItem.css';
import { TReqItem } from './SiderMainPage';

type TReqItemProps = {
  requestElement: TReqItem;
  rKey: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
function ReqListItem({ requestElement, rKey, setSelected }: TReqItemProps) {
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);

  const liStyle_Input: React.CSSProperties = {
    backgroundColor: inputDisabled ? 'rgb(217 217 227 / 0%)' : '#F1A038',
    color: '#000',
    fontFamily: `'VTBGroupUI-Regular, 'Sans-serif', -apple-system, Roboto'`,
  };

  return (
    <Space
      key={rKey}
      onClick={() => setSelected(rKey)}
      style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Space>
        <BankOutlined className='bank__icon' />
        <Input
          defaultValue={requestElement.text}
          style={liStyle_Input}
          className='liStyle_Input'
          disabled={inputDisabled}
          onPressEnter={() => {
            setInputDisabled(true);
          }}
          onBlur={() => {
            setInputDisabled(true);
          }}
        />
      </Space>
      <Space>
        <EditOutlined
          className='edit__icon'
          onClick={() => {
            setInputDisabled(false);
          }}
        />
        <DeleteOutlined className='delete__icon' />
      </Space>
    </Space>
  );
}

export default ReqListItem;
