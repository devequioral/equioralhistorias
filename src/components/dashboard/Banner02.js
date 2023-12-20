import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function MyComponent(props) {
  const { theme, data } = props;
  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="column">
            {data.image && (
              <Image
                src={data.image.src}
                width={data.image.width}
                height={data.image.height}
                alt="Background"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </div>
          <div className="column-2">
            <div className="div-3">
              <div className="div-4">{data.title}</div>
              <div className="div-5">{data.description}</div>
              {data.button && (
                <div className="div-6">
                  <Link
                    href="#"
                    style={{ width: '100%', display: 'flex', gap: '10px' }}
                  >
                    {data.button.icon && (
                      <Image
                        src={data.button.icon.src}
                        width={data.button.icon.width}
                        height={data.button.icon.height}
                        alt="Background"
                      />
                    )}
                    <div className="div-7">Ordenar</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          border-radius: 10px;
          border: 1px solid rgba(212, 212, 212, 0.6);
          background-color: #fff;
          max-width: 722px;
          margin: 50px auto;
          height: 251px;
          padding: 20px 0;
        }
        @media (max-width: 991px) {
          .div {
            padding-right: 20px;
            display: flex;
            flex-direction: column;
          }
        }
        @media (max-width: 640px) {
          .div {
            display: flex;
            flex-direction: column;
          }
        }
        .div-2 {
          gap: 20px;
          display: flex;
          position: relative;
          justify-content: flex-end;
        }
        @media (max-width: 991px) {
          .div-2 {
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 180px;
          margin-left: 0px;
          position: absolute;
          top: -20px;
          left: 0;
          z-index: 1;
        }

        @media (max-width: 492px) {
          .column {
            display: none;
          }
        }
        .img {
          aspect-ratio: 0.71;
          object-fit: contain;
          object-position: center;
          width: 153px;
          overflow: hidden;
          max-width: 100%;
          flex-grow: 1;
        }

        @media (max-width: 640px) {
          .img {
            position: absolute;
            z-index: 1;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 75%;
          margin-left: 20px;
          z-index: 2;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 70%;
          }
        }
        @media (max-width: 492px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-3 {
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 80%;
            margin: 40px auto 0;
          }
        }
        @media (max-width: 640px) {
          .div-3 {
            max-width: 50%;
            margin-left: auto;
            z-index: 2;
          }
        }
        .div-4 {
          color: #153d68;
          align-self: center;
          white-space: nowrap;
          font: 700 32px/100% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-4 {
            white-space: initial;
            text-align: center;
          }
        }
        @media (max-width: 640px) {
          .div-4 {
            text-align: center;
          }
        }
        .div-5 {
          color: rgba(0, 0, 0, 0.6);
          text-align: center;
          letter-spacing: 0.15px;
          width: 90%;
          margin-top: 32px;
          font: 400 12px/14px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 95%;
          }
          .div-5 {
            display: none;
          }
        }
        .div-6 {
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.2);
          background-color: #4f3cc9;
          align-self: center;
          display: flex;
          margin-top: 27px;
          gap: 8px;
          padding: 8px 14px;
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 20px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-7 {
          color: #fff;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          align-self: stretch;
          flex-grow: 1;
          white-space: nowrap;
          font: 400 14px/25px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
