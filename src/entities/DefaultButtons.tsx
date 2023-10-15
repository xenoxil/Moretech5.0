// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Placemark } from '@pbe/react-yandex-maps';
import { Button, Row } from 'antd';
import '../styles/DefaultButton.css';
import { TSiderProps } from './SiderMainPage';
import { office } from '/src/shared/mok/office';
import React from 'react';

export default function DefaultButtons({
  setMapRenderState,
  setCurrentMap,
  setHeaderText,
  setIsLoading,
  setBankCoords,
  setVisible,
  setMyPosition,
  setBankItem,
}: Pick<TSiderProps, 'setMapRenderState' | 'setCurrentMap' | 'setHeaderText' | 'currentData'>) {
  let currentBankBranch = {};

  //Функции
  const markerMe = (latitude: number, longitude: number) => {
    return (
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
    );
  };

  const findMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setIsLoading(true);
      setHeaderText('Определить моё местоположение');

      setMapRenderState({
        center: [latitude, longitude],
        zoom: 16,
      });

      setCurrentMap(markerMe(latitude, longitude));
    });
  };

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
    document.addEventListener('click', route);
    return () => document.removeEventListener('click', route);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placemarksNearby = (latitude: number, longitude: number) => {
    const newLatitude = (latitude * 2000) / 63046.689652997775;
    const newLongitude = (latitude * 2000) / 63046.689652997775;

    const latitudeLeft = latitude - newLatitude;
    const latitudeRight = latitude + newLongitude;

    const longitudeLeft = longitude - newLongitude;
    const longitudeRight = longitude + newLongitude;

    return office.map((bankBranch, i) => {
      if (latitudeLeft <= bankBranch.latitude && latitudeRight >= bankBranch.latitude) {
        if (longitudeLeft <= bankBranch.longitude && longitudeRight >= bankBranch.longitude) {
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
                        bankBranch.openHours[1]?.days ? bankBranch.openHours[1]?.days + '.:' : ''
                      } ${bankBranch.openHours[1]?.hours ? bankBranch.openHours[1]?.hours : ''}</li>
                      <li>${
                        bankBranch.openHours[2]?.days ? bankBranch.openHours[2]?.days + '.:' : ''
                      } ${bankBranch.openHours[2]?.hours ? bankBranch.openHours[2]?.hours : ''}</li>
                      <li>${
                        bankBranch.openHours[3]?.days ? bankBranch.openHours[3]?.days + '.:' : ''
                      } ${bankBranch.openHours[3]?.hours ? bankBranch.openHours[3]?.hours : ''}</li>
                      <li>${
                        bankBranch.openHours[4]?.days ? bankBranch.openHours[4]?.days + '.:' : ''
                      } ${bankBranch.openHours[4]?.hours ? bankBranch.openHours[4]?.hours : ''}</li>
                      <li>${
                        bankBranch.openHours[5]?.days ? bankBranch.openHours[5]?.days + '.:' : ''
                      } ${bankBranch.openHours[5]?.hours ? bankBranch.openHours[5]?.hours : ''}</li>
                      <li>${
                        bankBranch.openHours[6]?.days ? bankBranch.openHours[6]?.days + '.:' : ''
                      } ${bankBranch.openHours[6]?.hours ? bankBranch.openHours[6]?.hours : ''}</li>
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
        }
      }
    });
  };

  const findNearestBanks = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setMapRenderState({
        center: [latitude, longitude],
        zoom: 12,
      });

      setCurrentMap(
        <>
          {markerMe(latitude, longitude)}
          {placemarksNearby(latitude, longitude)}
        </>,
      );
    });
  };

  return (
    <Row className='rowHelpStyle_Buttons'>
      <Button className='button button__margin' onClick={findMe}>
        Определить моё местоположение
      </Button>
      <Button className='button button__margin' onClick={findNearestBanks}>
        Найти ближайшие отделения банка
      </Button>
      {/* <Button className='button button__margin'>
        Показать малозагруженные отделения банка рядом
      </Button> */}
    </Row>
  );
}
