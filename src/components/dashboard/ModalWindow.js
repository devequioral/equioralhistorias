import Image from 'next/image';
import * as React from 'react';

export default function MyComponent(props) {
  const { theme, options, handleModalEvent } = props;
  return (
    <>
      <div className="ModalWindowBg"></div>
      <div className="ModalWindow">
        {options.closeable && (
          <Image
            src="/assets/images/icon-close-modal.svg"
            width={17}
            height={17}
            alt=""
            onClick={() => handleModalEvent('close')}
            style={{
              'aspect-ratio': 1,
              'object-fit': 'contain',
              'object-position': 'center',
              width: '17px',
              overflow: 'hidden',
              'align-self': 'end',
              'max-width': '100%',
              cursor: 'pointer',
            }}
          />
        )}
        <div className="title">{options.title}</div>
        <div
          className="option01"
          onClick={() => handleModalEvent(options.option01.name_event)}
        >
          {options.option01.text}
        </div>
        <div className="separator-options">O</div>
        <div
          className="option02"
          onClick={() => handleModalEvent(options.option02.name_event)}
        >
          {options.option02.text}
        </div>
      </div>
      <style jsx>{`
        .ModalWindow {
          align-items: center;
          border-radius: 20px;
          border: 1px solid #e0e0e3;
          background-color: #fff;
          display: flex;
          max-width: 494px;
          flex-direction: column;
          margin: 0 auto;
          padding: 20px 40px 48px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ModalWindowBg {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 991px) {
          .div {
            padding: 0 20px;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 17px;
          overflow: hidden;
          align-self: end;
          max-width: 100%;
        }
        .title {
          color: #6a6969;
          align-self: stretch;
          margin-top: 35px;
          white-space: nowrap;
          font: 400 25px Roboto, sans-serif;
        }
        @media (max-width: 991px) {
          .title {
            white-space: initial;
          }
        }
        @media (max-width: 640px) {
          .title {
            text-align: center;
          }
        }
        .option01 {
          color: #fff;
          white-space: nowrap;
          justify-content: center;
          border-radius: 5px;
          background-color: #82bb30;
          align-self: center;
          margin-top: 35px;
          padding: 10px 15px;
          font: 400 14px Roboto, sans-serif;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .option01 {
            white-space: initial;
          }
        }
        .separator-options {
          color: #6a6969;
          align-self: center;
          margin-top: 12px;
          white-space: nowrap;
          font: 400 14px Roboto, sans-serif;
        }
        @media (max-width: 991px) {
          .separator-options {
            white-space: initial;
          }
        }
        .option02 {
          color: #fff;
          white-space: nowrap;
          justify-content: center;
          border-radius: 5px;
          background-color: #153d68;
          align-self: center;
          margin-top: 12px;
          padding: 10px 15px;
          font: 400 14px Roboto, sans-serif;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .option02 {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
