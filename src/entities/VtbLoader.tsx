// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useLayoutEffect } from 'react';
import vtbLogo from '../shared/vtbLoader.svg';

export default function VtbLoader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div className='vtbLoader'>
      <img src={vtbLogo} alt='Загрузчик ВТБ' className='blink' />
    </div>
  );
}
