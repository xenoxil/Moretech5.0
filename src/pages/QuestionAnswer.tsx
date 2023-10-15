// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';

const QuestionAnswer: React.FC = ({
  children,
  answer,
  question,
}: {
  children: React.PropsWithChildren;
  answer: string;
  question: string;
}) => {
  return (
    <>
      <div
        style={{
          width: '100%',
          background: '#e0e1e1',
          borderRadius: '5px',
          padding: '10px',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,

          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <p
          style={{
            fontStyle: 'italic',
            width: '20%',
            background: '#33539b91',
            borderRadius: '5px',
            padding: '20px',
          }}>
          {question}
        </p>
      </div>

      <div
        style={{
          width: '100%',
          background: '#e0e1e1',
          borderRadius: '5px',
          padding: '10px',
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          display: 'flex',
          justifyContent: 'flex-start',
        }}>
        <p
          style={{
            fontStyle: 'italic',
            background: 'rgb(42 76 151)',
            borderRadius: '5px',
            padding: '20px',
          }}>
          {answer}
        </p>
      </div>
      {children}
    </>
  );
};

export default QuestionAnswer;
