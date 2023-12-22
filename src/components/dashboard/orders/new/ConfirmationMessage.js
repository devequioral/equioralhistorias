import * as React from 'react';

export default function MyComponent(props) {
  const { theme, order_id } = props;
  return (
    <>
      <div className="div">
        <div className="div-2">FELICIDADES</div>
        <div className="div-3">
          Su Orden Ha sido Completada. En unos minutos nuestra área comercial se
          pondrá en contacto con usted.
        </div>
        <div className="div-4">
          <div className="div-5">N. de Orden</div>
          <div className="div-6">{order_id}</div>
          <div className="div-7">
            Si tiene alguna duda con esta orden puede llamar al número de
            atención al cliente 0800-456 45 45
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          align-items: center;
          border-radius: 10px;
          border: 1px solid #82bb30;
          display: flex;
          max-width: 622px;
          flex-direction: column;
          padding: 50px 53px 50px 43px;
        }
        .div-2 {
          color: #153d68;
          align-self: stretch;
          font: 400 18px/111% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-3 {
          color: #2a2e66;
          letter-spacing: 0.15px;
          align-self: stretch;
          margin-top: 31px;
          font: 400 14px/16px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-4 {
          border-radius: 10px;
          border: 1px solid #d4d4d4;
          display: flex;
          margin-top: 38px;
          flex-direction: column;
          padding: 27px 10px;
        }
        .div-5 {
          color: #000;
          letter-spacing: 0.15px;
          text-transform: uppercase;
          align-self: center;
          white-space: nowrap;
          font: 400 14px/114% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-6 {
          color: #228ece;
          letter-spacing: 0.15px;
          text-decoration-line: underline;
          align-self: center;
          margin-top: 21px;
          white-space: nowrap;
          font: 400 14px/114% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-7 {
          color: #000;
          letter-spacing: 0.15px;
          margin-top: 24px;
          font: 400 10px/12px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </>
  );
}
