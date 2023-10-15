import { Avatar } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import '../styles/Helper.css';

export default function Helper() {
  const defaultSanyaText =
    'Привет! Меня зовут Саня и я - Твой персональный помощник! Возможно, тебе нужно что-то из следующих вариантов?';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sanyaText] = useState<string>(defaultSanyaText);

  const helpTextStyle: React.CSSProperties = {
    width: `inherit`,
  };

  return (
    <>
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar src='/src/shared/sanya_helper.jpg' className='avatarHelpStyle' />
        <div className='wrapper'>
          <Title level={5} style={helpTextStyle} className='helpTextStyle'>
            <div className='helpTextStyle__text'>{sanyaText}</div>
          </Title>
        </div>
      </div>
    </>
  );
}
