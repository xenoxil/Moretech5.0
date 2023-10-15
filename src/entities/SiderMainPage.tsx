// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  BankOutlined,
  ClearOutlined,
  DeleteOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { Clusterer, Placemark } from '@pbe/react-yandex-maps';
import { Button, Menu, MenuProps } from 'antd';
import React, { ReactNode, useState } from 'react';
import '../styles/Sider.css';
import ReqListItem from './ReqListItem';
import '../styles/Sider.css';
import { office } from '/src/shared/mok/office';

export type TSiderProps = {
  defaultHeaderText: string;
  setMapRenderState: React.Dispatch<
    React.SetStateAction<{ center: number[]; zoom: number } | object>
  >;
  setCurrentMap: React.Dispatch<React.SetStateAction<ReactNode>>;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  screenWidth: number;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setMyPosition: React.Dispatch<React.SetStateAction<[number, number] | []>>;
  setBankCoords: React.Dispatch<React.SetStateAction<[number, number] | []>>;
  setCompleteForm: React.Dispatch<React.SetStateAction<boolean>>;
};
export type TReqItem = {
  key: string;
  text: string;
  reqNameDisabled: boolean;
};
export default function SiderMainPage({
  setMapRenderState,
  setCurrentMap,
  collapsed,
  setCollapsed,
  screenWidth,
  showForm,
  setVisible,
  setMyPosition,
  setBankCoords,
  setCompleteForm,
  setBankItem,
}: TSiderProps) {
  //Стейт
  const [requests, setRequests] = useState<any[]>([{ text: 'Ваш первый запрос', key: '1' }]);
  const [selectedRequest, setSelectedRequest] = useState<string>('1');
  const menuArrayLabel = ['Очистить историю', 'Отобразить все банкоматы', 'Сбросить карту'];
  let currentBankBranch = {};

  //Стили
  const siderStyle__mainDivWithMenu: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: '15px 10px',
    background:
      'linear-gradient(0deg, rgba(0,40,130,1) 0%, rgba(51,83,155,1) 67%, rgba(0,170,255,1) 100%)',
  };

  const divWithAddButtonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonStyle_addNewRequest: React.CSSProperties = {
    borderColor: '#fff3',
    borderWidth: 1,
    width: '90%',
    marginTop: 5,
    backgroundColor: '#CCEEFF',
  };

  const ulStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    width: '90%',
    justifyContent: 'center',
  };

  const liStyle: React.CSSProperties = {
    maxWidth: 300,
    marginBottom: 15,
    backgroundColor: '#d9d9e3cc',
    borderRadius: 6,
    padding: 5,
    color: '#2F3441',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  function find(e: any) {
    if (e?.target.className === 'divButtons__secondButton') {
      showForm(true);
      setVisible(false);
    }
  }

  function routeCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setMapRenderState({
        center: [55.755864, 37.617698],
        zoom: 12,
      });

      setMyPosition([latitude, longitude]);

      setCurrentMap(
        <>
          {
            <Placemark
              key={Date.now().toString(36) + Math.random().toString(36).substring(2)}
              geometry={[latitude, longitude]}
              properties={{
                hintContent: 'Моё местоположение',
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: '/src/shared/selfMark.png',
                iconImageSize: [40, 48],
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          }
          {
            <Placemark
              onClick={() => setVisible(false)}
              key={Date.now().toString(36) + Math.random().toString(36).substring(2)}
              geometry={[currentBankBranch.latitude, currentBankBranch.longitude]}
              properties={{
                hintContent: currentBankBranch.salePointName,
                balloonContent: `
                <div class='baloon__mainDiv'>
                  <div class='baloon__dinInside'>
                    <h4 class='baloon__h5' >${currentBankBranch.salePointName}</h4>

                    <div class='div__contactsPrivate'>
                      <b>Контактные данные (для частных лиц)</b>
                      <div class='contactPrivate__divPhoneFree'>
                        <span>8(800)100-24-24</span>
                        <span class='contactPrivate__divPhoneFree__spanText'>Бесплатный звонок по России</span>
                      </div>
                      <div class='contactPrivate__divPhoneMoscow'>
                        <span>8(495)777-24-24</span>
                        <span class='contactPrivate__divPhoneFree__spanText'>Для жителей Москвы и Московской области</span>
                      </div>
                      <div class='contactPrivate__divMail'>
                        <span>info@vtb.ru</span>
                        <span class='contactPrivate__divPhoneFree__spanText'>Email</span>
                      </div>
                    </div>

                    <div class='div__contactsLegal'>
                      <b>Контактные данные (для корпоративных клиентов)</b>
                      <div class='contactLegal__divPhoneFree'>
                        <span>8(800)200-77-99</span>
                        <span class='div__contactsLegal__spanText'>Бесплатный звонок по России</span>
                      </div>
                      <div class='contactLegal__divPhoneMoscow'>
                        <span>8(495)739-77-99</span>
                        <span class='div__contactsLegal__spanText'>Для жителей Москвы и Московской области</span>
                      </div>
                      <div class='contactLegal__divMail'>
                        <span>corp@vtb.ru</span>
                        <span class='div__contactsLegal__spanText'>Email</span>
                      </div>
                    </div>

                    <div class='adress'>
                      <b class='adress__b'>${currentBankBranch.address}</b>
                      <span class='adress__span'>${
                        currentBankBranch.metroStation !== null
                          ? currentBankBranch.metroStation
                          : 'Запись отсутсвует'
                      }</span>
                    </div>

                    <div class='divOpenHours'>
                      <b>Режим работы</b>
                      <ul class='divOpenHours__ul'>
                        <li>${currentBankBranch.openHours[0]?.days} ${
                  currentBankBranch.openHours[0]?.hours ? currentBankBranch.openHours[0]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[1]?.days
                            ? currentBankBranch.openHours[1]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[1]?.hours ? currentBankBranch.openHours[1]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[2]?.days
                            ? currentBankBranch.openHours[2]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[2]?.hours ? currentBankBranch.openHours[2]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[3]?.days
                            ? currentBankBranch.openHours[3]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[3]?.hours ? currentBankBranch.openHours[3]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[4]?.days
                            ? currentBankBranch.openHours[4]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[4]?.hours ? currentBankBranch.openHours[4]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[5]?.days
                            ? currentBankBranch.openHours[5]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[5]?.hours ? currentBankBranch.openHours[5]?.hours : ''
                }</li>
                        <li>${
                          currentBankBranch.openHours[6]?.days
                            ? currentBankBranch.openHours[6]?.days + '.:'
                            : ''
                        } ${
                  currentBankBranch.openHours[6]?.hours ? currentBankBranch.openHours[6]?.hours : ''
                }</li>
                      </ul>
                    </div>

                    <div class='div__specialServices'>
                      <b>Специальные услуги</b>
                      <span>Подходит для маломобильных и слабовидящих клиентов</span>
                    </div>

                    <div class='divOpenHours__special'>
                      <b>Режим работы (специальные услуги)</b>
                      <ul class='divOpenHours__special__ul'>
                      <li>${currentBankBranch.openHoursIndividual[0]?.days} ${
                  currentBankBranch.openHoursIndividual[0]?.hours
                    ? currentBankBranch.openHoursIndividual[0]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[1]?.days
                                  ? currentBankBranch.openHoursIndividual[1]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[1]?.hours
                    ? currentBankBranch.openHoursIndividual[1]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[2]?.days
                                  ? currentBankBranch.openHoursIndividual[2]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[2]?.hours
                    ? currentBankBranch.openHoursIndividual[2]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[3]?.days
                                  ? currentBankBranch.openHoursIndividual[3]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[3]?.hours
                    ? currentBankBranch.openHoursIndividual[3]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[4]?.days
                                  ? currentBankBranch.openHoursIndividual[4]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[4]?.hours
                    ? currentBankBranch.openHoursIndividual[4]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[5]?.days
                                  ? currentBankBranch.openHoursIndividual[5]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[5]?.hours
                    ? currentBankBranch.openHoursIndividual[5]?.hours
                    : ''
                }</li>
                              <li>${
                                currentBankBranch.openHoursIndividual[6]?.days
                                  ? currentBankBranch.openHoursIndividual[6]?.days + '.:'
                                  : ''
                              } ${
                  currentBankBranch.openHoursIndividual[6]?.hours
                    ? currentBankBranch.openHoursIndividual[6]?.hours
                    : ''
                }</li>
                      </ul>
                    </div>

                  </div>
                </div>
                `,
                balloonContentFooter: `<div class='divButtons'>
                  <button class='divButtons__firstButton'>Построить маршрут</button>
                  <button class='divButtons__secondButton' id="btnForm">Записаться</button>
                </div>`,
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref:
                  currentBankBranch.colorStatus === 'yellow'
                    ? '/src/shared/yellowMark.png'
                    : currentBankBranch.colorStatus === 'red'
                    ? '/src/shared/redMark.png'
                    : '/src/shared/greenMark.png',
                iconImageSize: [40, 48],
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          }
        </>,
      );
    });
  }

  function route(e: any) {
    if (e?.target.className === 'divButtons__firstButton') {
      routeCoords();
      setVisible(true);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', find);
    document.addEventListener('click', route);
    return () => {
      document.removeEventListener('click', find);
      document.removeEventListener('click', route);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функции
  const onClickMenuItem: MenuProps['onClick'] = (e) => {
    showForm(false);
    setCompleteForm(false);

    if (e.key === '1') {
      setRequests([]);
    }
    if (e.key === '2') {
      setIsLoading(true);
      setMapRenderState({
        center: [55.755864, 37.617698],
        zoom: 10,
        controls: [],
      });

      setCurrentMap(
        <Clusterer
          options={{
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
          }}>
          {office.map((bankBranch, i) => {
            return (
              <Placemark
                onClick={() => {
                  currentBankBranch = bankBranch;
                  setBankCoords([bankBranch.latitude, bankBranch.longitude]);
                  setBankItem(bankBranch);
                }}
                key={i}
                geometry={[bankBranch.latitude, bankBranch.longitude]}
                properties={{
                  hintContent: bankBranch.salePointName,
                  balloonContent: `
                  <div class='baloon__mainDiv'>
                    <div class='baloon__dinInside'>
                      <h4 class='baloon__h5' >${bankBranch.salePointName}</h4>

                      <div class='div__contactsPrivate'>
                        <b>Контактные данные (для частных лиц)</b>
                        <div class='contactPrivate__divPhoneFree'>
                          <span>8(800)100-24-24</span>
                          <span class='contactPrivate__divPhoneFree__spanText'>Бесплатный звонок по России</span>
                        </div>
                        <div class='contactPrivate__divPhoneMoscow'>
                          <span>8(495)777-24-24</span>
                          <span class='contactPrivate__divPhoneFree__spanText'>Для жителей Москвы и Московской области</span>
                        </div>
                        <div class='contactPrivate__divMail'>
                          <span>info@vtb.ru</span>
                          <span class='contactPrivate__divPhoneFree__spanText'>Email</span>
                        </div>
                      </div>

                      <div class='div__contactsLegal'>
                        <b>Контактные данные (для корпоративных клиентов)</b>
                        <div class='contactLegal__divPhoneFree'>
                          <span>8(800)200-77-99</span>
                          <span class='div__contactsLegal__spanText'>Бесплатный звонок по России</span>
                        </div>
                        <div class='contactLegal__divPhoneMoscow'>
                          <span>8(495)739-77-99</span>
                          <span class='div__contactsLegal__spanText'>Для жителей Москвы и Московской области</span>
                        </div>
                        <div class='contactLegal__divMail'>
                          <span>corp@vtb.ru</span>
                          <span class='div__contactsLegal__spanText'>Email</span>
                        </div>
                      </div>

                      <div class='adress'>
                        <b class='adress__b'>${bankBranch.address}</b>
                        <span class='adress__span'>${
                          bankBranch.metroStation !== null
                            ? bankBranch.metroStation
                            : 'Запись отсутсвует'
                        }</span>
                      </div>

                      <div class='divOpenHours'>
                        <b>Режим работы</b>
                        <ul class='divOpenHours__ul'>
                          <li>${bankBranch.openHours[0]?.days} ${
                    bankBranch.openHours[0]?.hours ? bankBranch.openHours[0]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[1]?.days
                              ? bankBranch.openHours[1]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[1]?.hours ? bankBranch.openHours[1]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[2]?.days
                              ? bankBranch.openHours[2]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[2]?.hours ? bankBranch.openHours[2]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[3]?.days
                              ? bankBranch.openHours[3]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[3]?.hours ? bankBranch.openHours[3]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[4]?.days
                              ? bankBranch.openHours[4]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[4]?.hours ? bankBranch.openHours[4]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[5]?.days
                              ? bankBranch.openHours[5]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[5]?.hours ? bankBranch.openHours[5]?.hours : ''
                  }</li>
                          <li>${
                            bankBranch.openHours[6]?.days
                              ? bankBranch.openHours[6]?.days + '.:'
                              : ''
                          } ${
                    bankBranch.openHours[6]?.hours ? bankBranch.openHours[6]?.hours : ''
                  }</li>
                        </ul>
                      </div>

                      <div class='div__specialServices'>
                        <b>Специальные услуги</b>
                        <span>Подходит для маломобильных и слабовидящих клиентов</span>
                      </div>

                      <div class='divOpenHours__special'>
                        <b>Режим работы (специальные услуги)</b>
                        <ul class='divOpenHours__special__ul'>
                        <li>${bankBranch.openHoursIndividual[0]?.days} ${
                    bankBranch.openHoursIndividual[0]?.hours
                      ? bankBranch.openHoursIndividual[0]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[1]?.days
                                    ? bankBranch.openHoursIndividual[1]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[1]?.hours
                      ? bankBranch.openHoursIndividual[1]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[2]?.days
                                    ? bankBranch.openHoursIndividual[2]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[2]?.hours
                      ? bankBranch.openHoursIndividual[2]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[3]?.days
                                    ? bankBranch.openHoursIndividual[3]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[3]?.hours
                      ? bankBranch.openHoursIndividual[3]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[4]?.days
                                    ? bankBranch.openHoursIndividual[4]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[4]?.hours
                      ? bankBranch.openHoursIndividual[4]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[5]?.days
                                    ? bankBranch.openHoursIndividual[5]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[5]?.hours
                      ? bankBranch.openHoursIndividual[5]?.hours
                      : ''
                  }</li>
                                <li>${
                                  bankBranch.openHoursIndividual[6]?.days
                                    ? bankBranch.openHoursIndividual[6]?.days + '.:'
                                    : ''
                                } ${
                    bankBranch.openHoursIndividual[6]?.hours
                      ? bankBranch.openHoursIndividual[6]?.hours
                      : ''
                  }</li>
                        </ul>
                      </div>

                    </div>
                  </div>
                  `,
                  balloonContentFooter: `<div class='divButtons'>
                    <button class='divButtons__firstButton'>Построить маршрут</button>
                    <button class='divButtons__secondButton' id="btnForm">Записаться</button>
                  </div>`,
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref:
                    bankBranch.colorStatus === 'yellow'
                      ? '/src/shared/yellowMark.png'
                      : bankBranch.colorStatus === 'red'
                      ? '/src/shared/redMark.png'
                      : '/src/shared/greenMark.png',
                  iconImageSize: [40, 48],
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
            );
          })}
        </Clusterer>,
      );
    }
    if (e.key === '3') {
      // window.location.reload();
      setMapRenderState({});
      setMyPosition([]);
      setBankCoords([]);
      setVisible(false);
    }
  };

  return (
    <div
      className={!collapsed && screenWidth < 600 ? 'fullSider' : ''}
      style={siderStyle__mainDivWithMenu}>
      <div style={divWithAddButtonStyle}>
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
        <Button
          style={buttonStyle_addNewRequest}
          className='buttonNewRequest'
          onClick={() => {
            const newReqId = `${new Date()}` + Math.random();
            setRequests([...requests, { text: 'Новый запрос', key: newReqId }]);
            setSelectedRequest(newReqId);
          }}>
          <PlusSquareOutlined className='buttonNewRequest__icon' />
          <span style={{ color: '#000' }} className='buttonNewRequest__text'>
            Новый запрос
          </span>
        </Button>
        <ul style={ulStyle}>
          {requests?.map((requestElement: TReqItem) => {
            return (
              <li
                key={requestElement.key}
                style={
                  selectedRequest === requestElement.key
                    ? { ...liStyle, backgroundColor: 'white' }
                    : liStyle
                }>
                <ReqListItem
                  requestElement={requestElement}
                  rKey={requestElement.key}
                  setSelected={setSelectedRequest}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Menu
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // padding: 15
          }}
          mode='inline'
          onClick={onClickMenuItem}
          items={[DeleteOutlined, BankOutlined, ClearOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: menuArrayLabel[index],
          }))}
        />
      </div>
    </div>
  );
}
