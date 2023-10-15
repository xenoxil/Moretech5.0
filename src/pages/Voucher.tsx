// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CopyOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip, Typography } from 'antd';
import download from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { useLayoutEffect, useState } from 'react';
const Voucher: React.FC = () => {
  const [timerSeconds, setTimerSecond] = useState<number>(5);

  function handleSave() {
    if (document?.getElementById('my-node') as HTMLInputElement) {
      htmlToImage
        .toPng(document?.getElementById('my-node') as HTMLInputElement)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          // document.body.appendChild(img);

          download(dataUrl, 'Талон.png');
          setTimerSecond(0);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  }
  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setTimerSecond((prev) => {
        if (prev <= 1) {
          setTimeout(() => {
            clearInterval(timer);
            handleSave();
          });
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  return (
    <>
      {timerSeconds > 0 ? (
        <p>
          {`Автоматическое скачивание талона начнётся через ${timerSeconds}. Если этого не произошло нажмите`}{' '}
          <span
            style={{ color: 'blue' }}
            onClick={() => {
              handleSave();
              setTimerSecond(0);
            }}>
            СКАЧАТЬ
          </span>
        </p>
      ) : (
        <p>{'Скачивание успешно завершено!'}</p>
      )}
      <Card style={{ width: 300 }} id='my-node'>
        <div className='VoucherRow'>
          <img width={100} alt='лого' src='src/shared/VTB_logo_ru.png' />
          <Typography.Title style={{ margin: 0 }}>А051</Typography.Title>
          <Typography.Title level={4}>Банковские карты</Typography.Title>
          <Typography.Text>Перед Вами 12 чел.</Typography.Text>
          <Typography.Text>Прогнозируемое время ожидания</Typography.Text>
          <Typography.Text>1.5 часа</Typography.Text>
          <Typography.Text>г. Москва, ул. Богданова, д. 50</Typography.Text>
          <Typography.Text>15.10.2023 12:00</Typography.Text>
        </div>

        <Tooltip title='Скачать показатели в формате PNG'>
          <Button
            style={{ position: 'absolute', right: 30, top: 10, zIndex: '1000' }}
            onClick={handleSave}>
            <CopyOutlined />
          </Button>
        </Tooltip>
      </Card>
    </>
  );
};

export default Voucher;
