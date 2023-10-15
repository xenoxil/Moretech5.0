// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiDiContainer from '../shared/apiService/apiDiContainer';
import { message } from 'antd';

function Reglog() {
  const [buttonDisableState, setButtonDisableState] = useState<boolean>(false);
  const navigation = useNavigate();
  const emailReg = useRef<any>();
  const passwordReg = useRef<any>();
  const emailLog = useRef<any>();
  const passwordLog = useRef<any>();

  function isValidAuthData(email: string, password: string) {
    if (!email || !password) {
      return false;
    }
    return true;
  }

  function handleLoginClick(email: string, password: string) {
    if (!isValidAuthData(email, password)) {
      return message.warning('Упс! Кажется вы не ввели Email или пароль');
    }
    setButtonDisableState((prev) => !prev);
    ApiDiContainer.AuthController.postEmail({ email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('access_token', res.data.token);
        navigation('/main');
      })
      .catch((err) => {
        console.log(`error`, err);
        message.error('Ошибка при авторизации');
      })
      .finally(() => {
        setButtonDisableState((prev) => !prev);
      });
  }

  function handleRegisterClick(email: string, password: string) {
    if (!isValidAuthData(email, password)) {
      return message.warning('Упс! Кажется вы не ввели Email или пароль');
    }
    setButtonDisableState((prev) => !prev);
    ApiDiContainer.AuthController.register({ email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('access_token', res.data.token);
        navigation('/main');
      })
      .catch((err) => {
        console.log(`error`, err);
        message.error('Ошибка при авторизации');
      })
      .finally(() => {
        setButtonDisableState((prev) => !prev);
      });
  }

  function handleSubmitLogin(e: any): void {
    e.preventDefault();
    handleLoginClick(emailLog.current.value, passwordLog.current.value);
  }

  function handleSubmitRegister(e: any): void {
    e.preventDefault();
    handleRegisterClick(emailReg.current.value, passwordReg.current.value);
  }

  return (
    <section className='section__reglog'>
      <input className='checkbox' type='checkbox' id='reg-log' name='reg-log' />
      <label htmlFor='reg-log' />
      <div className='card-3d-wrap'>
        <div className='card-3d-wrapper'>
          <div className='card-front'>
            <div className='center-wrap'>
              <form className='reglog__form'>
                <img
                  src='src/shared/VTB_logo_ru.png'
                  alt='логотип банка ВТБ'
                  style={{ textAlign: 'center', width: 100, height: 50 }}
                />
                <h4 className='reglog__formHeader'>Войти</h4>
                <div className='reglog__inputContainer'>
                  <input
                    type='email'
                    name='logemail'
                    className='form-input'
                    placeholder='Ваш Email'
                    id='logemail'
                    autoComplete='off'
                    ref={emailLog}
                  />
                  <input
                    type='password'
                    name='logpass'
                    className='form-input'
                    placeholder='Ваш пароль'
                    id='logpass'
                    autoComplete='off'
                    ref={passwordLog}
                  />
                </div>
                <button
                  className='reglog__submitBtn'
                  onClick={handleSubmitLogin}
                  disabled={buttonDisableState}>
                  Войти
                </button>
              </form>
            </div>
          </div>
          <div className='card-back'>
            <div className='center-wrap'>
              <form className='reglog__form'>
                <img
                  src='src/shared/VTB_logo_ru.png'
                  alt='логотип банка ВТБ'
                  style={{ textAlign: 'center', width: 100, height: 50 }}
                />
                <h4 className='reglog__formHeader'>Зарегистрироваться</h4>
                <div className='reglog__inputContainer'>
                  <input
                    type='email'
                    name='logemail'
                    className='form-input'
                    placeholder='Ваш Email'
                    id='regemail'
                    autoComplete='off'
                    ref={emailReg}
                  />
                  <input
                    type='password'
                    name='logpass'
                    className='form-input'
                    placeholder='Ваш пароль'
                    id='regpass'
                    autoComplete='off'
                    ref={passwordReg}
                  />
                </div>
                <button
                  className='reglog__submitBtn'
                  onClick={handleSubmitRegister}
                  disabled={buttonDisableState}>
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reglog;
