// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { SendOutlined } from '@ant-design/icons';
import { Map, Placemark, RouteButton, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { Layout } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useRef, useState } from 'react';
import DefaultButtons from '../entities/DefaultButtons';
import HeaderMainPage from '../entities/HeaderMainPage';
import Helper from '../entities/Helper';
import SiderMainPage from '../entities/SiderMainPage';
import '../styles/Header.css';
import QuestionAnswer from './QuestionAnswer';
import RegistrationInQueue from './RegistrationInQueue';
import Voucher from './Voucher';
import '/src/styles/GPTVersion.css';
import VtbLoader from '../entities/VtbLoader';
import { office } from '/src/shared/mok/office';
import { categoryWithServices } from '/src/shared/mok/categoryWithServices';

// import '/src/styles/GPTVersion.css';
const { Header, Content, Footer, Sider } = Layout;

export default function GPTVersion() {
  //Статика
  const defaultHeaderText = 'Введите свой запрос, чтобы начать поиск';

  //СТЕЙТ
  const [mapRenderState, setMapRenderState] = useState<any>({});
  const [currentMap, setCurrentMap] = useState<React.ReactNode>(<></>);
  const [headerText, setHeaderText] = useState<string>(defaultHeaderText);

  const [isForm, showForm] = useState<boolean>(false);
  const [completeForm, setCompleteForm] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);
  const contentRef3 = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const [visible, setVisible] = useState<boolean>(false);
  const [bankCoords, setBankCoords] = useState<any>([]);
  const [myPosition, setMyPosition] = useState<any>({});
  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);

  const [bankItem, setBankItem] = useState();
  const [searchText, setSearchText] = useState('');

  const resizeFunction = () => {
    setTimeout(() => {
      if (!collapsed) {
        setCollapsed(true);
      }
      setScreenWidth(window.innerWidth);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeFunction);
    return () => {
      window.removeEventListener('resize', resizeFunction);
    };
  }, []);

  useEffect(() => {
    if (contentRef2.current) {
      contentRef2.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
    // Проверяем, что ref существует и элемент присутствует в DOM
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }

    if (contentRef3.current) {
      contentRef3.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [currentMap, isForm, completeForm]);

  //СТИЛИ
  const layoutStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
  };

  const contentStyle: React.CSSProperties = {
    margin: '24px 16px 0',
    height: 'auto',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const [collapsed, setCollapsed] = useState(false);

  //РЕНДЕР
  return (
    <Layout style={layoutStyle}>
      {screenWidth >= 600 ? (
        <Sider
          id={'sider'}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={0}
          trigger={null}
          style={{
            color: 'white',
            display: screenWidth < 600 && collapsed ? 'none' : 'block',
          }}>
          <SiderMainPage
            showForm={showForm}
            setVisible={setVisible}
            setBankCoords={setBankCoords}
            setMyPosition={setMyPosition}
            screenWidth={screenWidth}
            setMapRenderState={setMapRenderState}
            setCurrentMap={setCurrentMap}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setCompleteForm={setCompleteForm}
            setBankItem={setBankItem}
          />
        </Sider>
      ) : null}
      <Layout
        style={{
          display: !collapsed && screenWidth <= 600 ? 'none' : 'inherit',
          position: 'relative',
        }}>
        <Header className='headerStyle'>
          <HeaderMainPage
            headerText={headerText}
            screenWidth={screenWidth}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
        </Header>
        <Content style={contentStyle}>
          <Helper />
          <DefaultButtons
            setIsLoading={setIsMapLoading}
            setMapRenderState={setMapRenderState}
            setCurrentMap={setCurrentMap}
            setHeaderText={setHeaderText}
            setBankCoords={setBankCoords}
            setVisible={setVisible}
            setMyPosition={setMyPosition}
            setBankItem={setBankItem}
          />
          {/* <div className='section'> */}

          {Object.keys(mapRenderState).length === 0 ? (
            <div
              style={{
                width: '100%',
                height: '65%',
                background: 'rgb(197 199 200 / 45%)',
                borderRadius: '5px',
                padding: '10px',
              }}>
              <p style={{ fontStyle: 'italic' }}>Спросите что-нибудь...</p>
            </div>
          ) : (
            <>
              <QuestionAnswer
                question='Определить меня'
                answer='по вашему запросу найдено следующее:'>
                <YMaps
                  query={{
                    apikey: '1220f30b-a6d4-4c7e-ab16-ded8732119f7',
                    suggest_apikey: '8dbcba5f-6cdc-47e7-b593-2132ad4e7bfe',
                  }}>
                  <div
                    ref={contentRef}
                    style={{
                      background: '#e0e1e1',
                      width: '100%',
                      height: '90%',
                      padding: '10px',
                    }}>
                    <Map
                      onLoad={() => setIsMapLoading(false)}
                      state={{
                        ...mapRenderState,
                        behaviors: ['drag', 'dblClickZoom', 'multiTouch', 'routeEditor'],
                      }}
                      height='100%'
                      width='inherit'
                      options={{ yandexMapDisablePoiInteractivity: true }}>
                      {currentMap}

                      <RouteButton
                        options={{
                          float: 'right',
                        }}
                        state={{
                          expanded: visible,
                        }}
                        instanceRef={(ref) => {
                          if (ref) {
                            ref.routePanel.state.set({
                              fromEnabled: false,
                              from: myPosition,
                              to: bankCoords,
                              type: 'auto',
                            });
                          }
                        }}
                      />

                      <ZoomControl options={{ float: 'right' }} />
                    </Map>
                  </div>
                </YMaps>
              </QuestionAnswer>

              {isForm && !completeForm && (
                <div ref={contentRef2}>
                  <RegistrationInQueue setCompleteForm={setCompleteForm} bankItem={bankItem} />
                </div>
              )}

              {completeForm && (
                <>
                  <div
                    ref={contentRef3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: '15px',
                    }}>
                    <Voucher />
                  </div>
                </>
              )}
            </>
          )}
          {/* </div> */}
        </Content>
        <div className='zonaTexta'>
          <Search
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Начните вводить здесь свой запрос'
            size='large'
            suffix={
              <SendOutlined
                onClick={() => {
                  categoryWithServices.map((item) => {
                    if (item.services.includes(searchText)) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;

                        const newLatitude = (latitude * 2000) / 63046.689652997775;
                        const newLongitude = (latitude * 2000) / 63046.689652997775;

                        const latitudeLeft = latitude - newLatitude;
                        const latitudeRight = latitude + newLongitude;

                        const longitudeLeft = longitude - newLongitude;
                        const longitudeRight = longitude + newLongitude;

                        setMapRenderState({
                          center: [latitude, longitude],
                          zoom: 12,
                        });

                        setMyPosition([latitude, longitude]);

                        setCurrentMap(
                          <>
                            <Placemark
                              key={
                                Date.now().toString(36) + Math.random().toString(36).substring(2)
                              }
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
                            {office
                              .filter((elem) => item['key'] in elem)
                              .map((bankBranch, i) => {
                                if (
                                  latitudeLeft <= bankBranch.latitude &&
                                  latitudeRight >= bankBranch.latitude
                                ) {
                                  if (
                                    longitudeLeft <= bankBranch.longitude &&
                                    longitudeRight >= bankBranch.longitude
                                  ) {
                                    return (
                                      <Placemark
                                        onClick={() => {
                                          setBankCoords([
                                            bankBranch.latitude,
                                            bankBranch.longitude,
                                          ]);
                                          setBankItem(bankBranch);
                                        }}
                                        key={i}
                                        geometry={[bankBranch.latitude, bankBranch.longitude]}
                                        properties={{
                                          hintContent: bankBranch.salePointName,
                                          balloonContent: `
                                            <div class='baloon__mainDiv'>
                                              <div class='baloon__dinInside'>
                                                <h4 class='baloon__h5' >${
                                                  bankBranch.salePointName
                                                }</h4>
                              
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
                                            bankBranch.openHours[0]?.hours
                                              ? bankBranch.openHours[0]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[1]?.days
                                                        ? bankBranch.openHours[1]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[1]?.hours
                                              ? bankBranch.openHours[1]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[2]?.days
                                                        ? bankBranch.openHours[2]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[2]?.hours
                                              ? bankBranch.openHours[2]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[3]?.days
                                                        ? bankBranch.openHours[3]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[3]?.hours
                                              ? bankBranch.openHours[3]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[4]?.days
                                                        ? bankBranch.openHours[4]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[4]?.hours
                                              ? bankBranch.openHours[4]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[5]?.days
                                                        ? bankBranch.openHours[5]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[5]?.hours
                                              ? bankBranch.openHours[5]?.hours
                                              : ''
                                          }</li>
                                                    <li>${
                                                      bankBranch.openHours[6]?.days
                                                        ? bankBranch.openHours[6]?.days + '.:'
                                                        : ''
                                                    } ${
                                            bankBranch.openHours[6]?.hours
                                              ? bankBranch.openHours[6]?.hours
                                              : ''
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
                                                              ? bankBranch.openHoursIndividual[1]
                                                                  ?.days + '.:'
                                                              : ''
                                                          } ${
                                            bankBranch.openHoursIndividual[1]?.hours
                                              ? bankBranch.openHoursIndividual[1]?.hours
                                              : ''
                                          }</li>
                                                          <li>${
                                                            bankBranch.openHoursIndividual[2]?.days
                                                              ? bankBranch.openHoursIndividual[2]
                                                                  ?.days + '.:'
                                                              : ''
                                                          } ${
                                            bankBranch.openHoursIndividual[2]?.hours
                                              ? bankBranch.openHoursIndividual[2]?.hours
                                              : ''
                                          }</li>
                                                          <li>${
                                                            bankBranch.openHoursIndividual[3]?.days
                                                              ? bankBranch.openHoursIndividual[3]
                                                                  ?.days + '.:'
                                                              : ''
                                                          } ${
                                            bankBranch.openHoursIndividual[3]?.hours
                                              ? bankBranch.openHoursIndividual[3]?.hours
                                              : ''
                                          }</li>
                                                          <li>${
                                                            bankBranch.openHoursIndividual[4]?.days
                                                              ? bankBranch.openHoursIndividual[4]
                                                                  ?.days + '.:'
                                                              : ''
                                                          } ${
                                            bankBranch.openHoursIndividual[4]?.hours
                                              ? bankBranch.openHoursIndividual[4]?.hours
                                              : ''
                                          }</li>
                                                          <li>${
                                                            bankBranch.openHoursIndividual[5]?.days
                                                              ? bankBranch.openHoursIndividual[5]
                                                                  ?.days + '.:'
                                                              : ''
                                                          } ${
                                            bankBranch.openHoursIndividual[5]?.hours
                                              ? bankBranch.openHoursIndividual[5]?.hours
                                              : ''
                                          }</li>
                                                          <li>${
                                                            bankBranch.openHoursIndividual[6]?.days
                                                              ? bankBranch.openHoursIndividual[6]
                                                                  ?.days + '.:'
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
                                        modules={[
                                          'geoObject.addon.balloon',
                                          'geoObject.addon.hint',
                                        ]}
                                      />
                                    );
                                  }
                                }
                              })}
                          </>,
                        );
                      });
                    }
                  });
                }}
                style={{
                  fontSize: 16,
                  color: '#1677ff',
                }}
              />
            }
          />
        </div>
        <Footer className='footerStyle'>More.Tech 5.0 ©2023 Click_Group_Team</Footer>
        {isMapLoading ? <VtbLoader setIsLoading={setIsMapLoading} /> : null}
      </Layout>
      {!collapsed && screenWidth < 600 ? (
        <>
          <Sider
            id={'sider'}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            collapsedWidth={0}
            trigger={null}
            style={{
              color: 'white',
              display: screenWidth < 600 && collapsed ? 'none' : 'block',
            }}>
            <SiderMainPage
              showForm={showForm}
              setVisible={setVisible}
              setBankCoords={setBankCoords}
              setMyPosition={setMyPosition}
              screenWidth={screenWidth}
              setMapRenderState={setMapRenderState}
              setCurrentMap={setCurrentMap}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              setCompleteForm={setCompleteForm}
              setBankItem={setBankItem}
            />
          </Sider>
        </>
      ) : null}
    </Layout>
  );
}
