// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { FC } from 'react';
import { Card, Col, Row } from 'antd';
import { BankObj } from '../app/bankCardInterface';
import '../styles/BankCard.css';
import { MapState } from '../app/mapInterface';

const cardStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 0,
};

const descTextStyle: React.CSSProperties = {
  textAlign: 'start',
};

const rowStyle: React.CSSProperties = {
  width: '100%',
};

const grayText: React.CSSProperties = {
  color: '#999',
  fontSize: 14,
};

const flexDivColumn: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const flexDivRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 5,
  lineHeight: '20px',
  fontWeight: 500,
  overflow: 'hidden',
  width: 200,
};

interface BankCardProps {
  bankData: BankObj;
  key: string | number;
  setMapState: React.Dispatch<React.SetStateAction<MapState>>;
}

const BankCard: FC<BankCardProps> = ({ bankData, key, setMapState }) => {
  return (
    <Card
      style={cardStyle}
      key={key}
      id={bankData.id.toString()}
      onClick={() => {
        setMapState({
          center: bankData.coords,
          zoom: 17,
          controls: [],
        });
      }}
      className={
        bankData.number_person_now / bankData.banking_window >= 3
          ? 'bankCard bankCard__red'
          : bankData.number_person_now / bankData.banking_window >= 2
          ? 'bankCard bankCard__yellow'
          : 'bankCard bankCard__green'
      }>
      <Row gutter={[16, 16]}>
        <Row //Название
          style={rowStyle}>
          <Col span={24} style={descTextStyle}>
            <div style={flexDivRow}>
              <div style={cardTitleStyle}>{bankData.name + ' ВТБ' ?? 'Не указано'}</div>
              <img
                src='https://lider.pnzgu.ru/files/lider.pnzgu.ru/partners/banners/100.png'
                alt='иконка банка'
                style={{ width: 50, height: 50 }}
              />
            </div>
          </Col>
        </Row>
        <Row //краткое описание
          style={rowStyle}>
          <Col span={20} style={descTextStyle}>
            <b>Адрес</b>
            <p style={{ margin: 0 }}>{bankData.address}</p>
          </Col>

          <Col span={4}></Col>
        </Row>

        <Row //режим работы
          style={rowStyle}>
          <Col span={24} style={descTextStyle}>
            <b style={{ marginBottom: 0 }}>Режим работы</b>

            <div style={flexDivColumn}>
              <span style={grayText}>Обслуживание физ. лиц: </span>
              <span>{bankData.private_person ?? 'Не обслуживаются'}</span>
            </div>

            <div style={flexDivColumn}>
              <span style={grayText}>Обслуживание юр. лиц: </span>
              <span>{bankData.legal_person ?? 'Не обслуживаются'}</span>
            </div>

            <div style={flexDivColumn}>
              <span style={grayText}>Обслуживание vip лиц: </span>
              <span>{bankData.vip_person ?? 'Не обслуживаются'}</span>
            </div>
          </Col>
        </Row>

        <Row //метро
          style={rowStyle}>
          <Col span={24} style={descTextStyle}>
            <div style={flexDivColumn}>
              <b>Ближайшее метро</b>
              <span>{bankData.metro_name ?? 'Не указано'}</span>
            </div>
          </Col>
        </Row>

        <Row //телефон
          style={rowStyle}>
          <Col span={24} style={descTextStyle}>
            <div style={flexDivColumn}>
              <b>Контактные данные</b>
              {bankData.phone
                ?.split(',')
                .map((phoneNumber, i) => <span key={i}>{phoneNumber}</span>) ?? 'Не указано'}
            </div>
          </Col>
        </Row>
      </Row>
    </Card>
  );
};

export default BankCard;
