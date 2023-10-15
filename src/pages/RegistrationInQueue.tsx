// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Grid,
  // InputNumber,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Steps,
  theme,
  Typography,
} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import React, { useState } from 'react';
const { useBreakpoint } = Grid;
const RegistrationInQueue: React.FC<{
  setCompleteForm: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setCompleteForm, bankItem }) => {
  const screens = useBreakpoint();
  console.log(screens);
  const [value, setValue] = useState(1);

  let branches = [];
  let services = [];

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current + 1 < new Date();
  };

  const disabledDateTime = () => ({
    disabledHours: () => {
      const arr = range(0, 24);
      arr.splice(10, 10);
      return arr;
    },
    disabledMinutes: () => {
      const arr = range(1, 60);
      arr.splice(14, 1);
      arr.splice(28, 1);
      arr.splice(42, 1);
      return arr;
    },
    disabledSeconds: () => range(1, 59),
  });

  for (const key of Object.keys(bankItem)) {
    if (key === 'consumerCredit') {
      branches = [
        ...branches,
        {
          label: 'Потребительские кредиты',
          value: 'consumerCredit',
        },
      ];
      services = [...services, 'Оформить потребительский кредит'];
    }
    if (key === 'debitCard' || key === 'creditCard') {
      branches = [
        ...branches,
        {
          label: 'Банковские карты',
          value: 'debitCard',
        },
      ];
      services = [...services, 'Оформить дебетовую карту'];
    }
    if (key === 'extractsReferences') {
      branches = [
        ...branches,
        {
          label: 'Выписки и справки',
          value: 'extractsReferences',
        },
      ];
      services = [...services, 'Выписки и справки'];
    }
    if (key === 'creditCard') {
      services = [...services, 'Оформить кредитную карту'];
    }
    if (key === 'deposits') {
      branches = [
        ...branches,
        {
          label: 'Вклады',
          value: 'deposits',
        },
      ];
      services = [...services, 'Вклады(открытие, получение процентов, закрытие)'];
    }
    if (key === 'rkoWindow') {
      branches = [
        ...branches,
        {
          label: 'РКО',
          value: 'rkoWindow',
        },
      ];
      services = [...services, 'Открыть счет РКО'];
    }
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Банк',
      content: (
        <Card>
          <Row>
            <Col span={24}>
              <Typography.Text>Выберите отделение</Typography.Text>
            </Col>
            <Col span={24}>
              <Select placeholder='Выберите отделение' options={branches} />
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <Button type='primary' onClick={() => next()}>
                Следующий
              </Button>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      title: 'Услуга',
      content: (
        <Card>
          <Row>
            <Col span={24}>
              <Radio.Group onChange={onChange} value={value}>
                <Space.Compact direction='row' block>
                  {services.map((item) => (
                    <Radio.Button value={1}>{item}</Radio.Button>
                  ))}
                  {/* <Radio.Button value={1}>Оформить потребительский кредит</Radio.Button>
                  <Radio.Button value={2}>Оформить дебетовую карту</Radio.Button>
                  <Radio.Button value={3}>Выписки и справки</Radio.Button>
                  <Radio.Button value={4}>Оформить кредитную карту</Radio.Button>
                  <Radio.Button value={5}>
                    Вклады(открытие, получение процентов, закрытие)
                  </Radio.Button>
                  <Radio.Button value={6}>Открыть счет РКО</Radio.Button> */}
                </Space.Compact>
              </Radio.Group>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Назад
              </Button>

              <Button type='primary' onClick={() => next()}>
                Следующий
              </Button>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      title: 'Время посещения',
      content: (
        <Card>
          <Row>
            <Col span={24}>
              <Typography.Text>Выберите время посещения</Typography.Text>
            </Col>
            <Col span={24}>
              <DatePicker
                locale={locale}
                showTime
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                style={{ width: '200px' }}
              />
            </Col>

            {/* <Col span={24}>
              <Typography.Text>Ваш номер телефона</Typography.Text>
            </Col> */}
            {/* <Col span={24}>
              <InputNumber style={{ width: '200px' }} />
            </Col> */}

            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Назад
              </Button>

              <Button
                type='primary'
                onClick={() => {
                  message.success('успешно');
                  setCompleteForm(true);
                }}>
                Готово
              </Button>
            </Col>
          </Row>
        </Card>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',

    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};

export default RegistrationInQueue;
