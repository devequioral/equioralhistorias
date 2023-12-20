import Image from 'next/image';
import * as React from 'react';

export default function MyComponent(props) {
  const { theme, data } = props;
  return (
    <>
      <div className="OptionsCard">
        <div className="title">{data.title}</div>
        <div className="subtitle">{data.subtitle}</div>
        {data.categories.map((category, index) => (
          <div className="OptionItem" key={index}>
            <div className="OptionItemTitle">
              <Image
                src={category.icon.src}
                width={category.icon.width}
                height={category.icon.height}
                alt=""
              />
              <div className="OptionItemTitleText">{category.text}</div>
            </div>
            <div className="OptionItemBody">
              {category.options.map((option, index) => (
                <div className="OptionItemMenu" key={index}>
                  <div className="OptionItemMenuInfo">
                    <Image
                      src="/assets/images/icon-help.svg"
                      width={12}
                      height={12}
                      alt=""
                    />
                    <div className="OptionItemMenuInfoText">{option.text}</div>
                  </div>
                  <div className="OptionItemMenuRemove">
                    <Image
                      src="/assets/images/icon-remove.svg"
                      width={16}
                      height={16}
                      alt="Remove"
                    />
                  </div>
                  <div
                    className="OptionItemMenuAdd"
                    style={{ display: 'none' }}
                  >
                    <Image
                      src="/assets/images/icon-add.svg"
                      width={16}
                      height={16}
                      alt="Add"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="div-16">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6cdf9e75cde04f7744772f9a3940e5175659bc705547f5bf3b5e0464d065f72?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img"
          />
          <div className="div-17">Energía</div>
        </div>
        <div className="div-18">
          <div className="div-19">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-8"
            />
            <div className="div-20">Actualización de energía</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/129181fc1865a6d4ed717de3ecdcd1e2c6a72f4e96bdd97abf0ab17e207b8f3f?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-9"
          />
        </div>
        <div className="div-21">
          <div className="div-22">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-10"
            />
            <div className="div-23">Protección electromagnética</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/97fa82b59f9fc9d9ff88eb213e1b5d7d6dd2861b751e4e5677e8fa8a2f097095?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-11"
          />
        </div>
        <div className="div-24">
          <div className="div-25">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-12"
            />
            <div className="div-26">UPS Adicional 8 horas</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0a5a6ebeaea988500c666eff9fdce093755a6a56acae322ece0c327882f22aa?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-13"
          />
        </div>
        <div className="div-27">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1acf181dac214bb163aa6ee4e23883570000a176413ad5d4ed611339f6adf50?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img"
          />
          <div className="div-28">Protección Desastres</div>
        </div>
        <div className="div-29">
          <div className="div-30">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-14"
            />
            <div className="div-31">Alarma y extinción de incendios</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/72ae982aed3a607af42adadb684a12cc689c71024b3247be0ddec72a53dc6233?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-15"
          />
        </div>
        <div className="div-32">
          <div className="div-33">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-16"
            />
            <div className="div-34">Sellos ignífugos para pase de cables</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3edeef2a566ad992fd01f79a6f012bd2badddd5e9e7d2225ede90ca40065b5c5?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-17"
          />
        </div>
        <div className="div-35">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-18"
          />
          <div className="div-36">Sistema de anti vibración</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcb369f72fa83cb60e43e0a0057aab6d31ac7f36608b204534cc36e5980f180d?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-19"
          />
        </div>
        <div className="div-37">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0be79108c021090500a6b97ab011803847b1fff1026d1a77739fe3bf96433219?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img"
          />
          <div className="div-38">Refrigeración</div>
        </div>
        <div className="div-39">
          <div className="div-40">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
              className="img-20"
            />
            <div className="div-41">Sistema de Enfriamiento Adicional</div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfa982cfaf917f4eb0efed1535ce7e92f537ac57fcf925f2fb9937f8e9bd503f?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-21"
          />
        </div>
        <div className="div-42">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-22"
          />
          <div className="div-43">SIstema Automático de Refrigeración</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad7e1a863a71e443e2dda3ff74f6d2ba22a68ad5222d3de7f08007a70e2bb5cb?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-23"
          />
        </div>
        <div className="div-44">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2599c3f4c692bf48b2b14f08ec39e818abb198c7a84d66811acf0e302db70950?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-24"
          />
          <div className="div-45">Sellos Anti Calentamiento</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed7706bef0125e1dfc35cbea7372c9e72a54a37eae0ccf5c33b57ef0e611006e?apiKey=f71ce2d14dce475d8b8762047368b030&"
            className="img-25"
          />
        </div>
      </div>
      <style jsx>{`
        .OptionsCard {
          align-items: flex-start;
          border-radius: 10px;
          border: 1px solid rgba(212, 212, 212, 0.6);
          background-color: #fff;
          display: flex;
          max-width: 240px;
          flex-direction: column;
          padding: 27px 17px;
        }
        .title {
          color: #153d68;
          align-self: stretch;
          font: 400 18px/111% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .subtitle {
          color: rgba(21, 61, 104, 0.79);
          align-self: stretch;
          margin-top: 5px;
          font: 400 12px/117% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .OptionItemTitle {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin-top: 25px;
          justify-content: flex-start;
          gap: 12px;
        }
        .img {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .OptionItemTitleText {
          color: rgba(34, 142, 206, 0.9);
          letter-spacing: 0.15px;
          font: 400 15px/160% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .OptionItemBody {
          padding-left: 15px;
          align-self: stretch;
          display: flex;
          margin-top: 16px;
          flex-direction: column;
        }
        .OptionItemMenu {
          justify-content: space-between;
          display: flex;
          gap: 20px;
        }
        .OptionItemMenuInfo {
          justify-content: space-between;
          align-items: center;
          display: flex;
          gap: 4px;
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .OptionItemMenuInfoText {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/13px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 5px 0;
        }
        .img-3 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-10 {
          justify-content: space-between;
          display: flex;
          margin-top: 10px;
          gap: 20px;
        }
        .div-11 {
          justify-content: space-between;
          align-items: center;
          display: flex;
          gap: 4px;
        }
        .img-4 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-12 {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/13px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-5 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-13 {
          justify-content: space-between;
          display: flex;
          margin-top: 10px;
          width: 100%;
          gap: 20px;
          padding: 0 2px;
        }
        .div-14 {
          justify-content: space-between;
          align-items: center;
          display: flex;
          gap: 4px;
        }
        .img-6 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-15 {
          color: #153d68;
          letter-spacing: 0.15px;
          align-self: stretch;
          flex-grow: 1;
          white-space: nowrap;
          font: 400 12px/24px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-7 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-16 {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin-top: 24px;
          justify-content: space-between;
          gap: 12px;
        }
        .div-17 {
          color: rgba(34, 142, 206, 0.9);
          letter-spacing: 0.15px;
          font: 400 15px/160% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-18 {
          justify-content: space-between;
          align-items: center;
          align-self: start;
          display: flex;
          width: 100%;
          gap: 20px;
          margin: 16px 0 0 16px;
          padding: 4px 0;
        }
        .div-19 {
          display: flex;
          align-items: start;
          gap: 4px;
          margin: auto 0;
        }
        .img-8 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-20 {
          color: #153d68;
          letter-spacing: 0.15px;
          flex-grow: 1;
          white-space: nowrap;
          font: 400 12px/200% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-9 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: stretch;
          max-width: 100%;
        }
        .div-21 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          width: 100%;
          gap: 20px;
          margin: 10px 0 0 16px;
          padding: 1px;
        }
        .div-22 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }
        .img-10 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-23 {
          color: #153d68;
          letter-spacing: 0.15px;
          align-self: stretch;
          font: 400 12px/13px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-11 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-24 {
          justify-content: space-between;
          align-items: center;
          align-self: start;
          display: flex;
          gap: 20px;
          margin: 10px 0 0 16px;
          padding: 4px 0;
        }
        .div-25 {
          display: flex;
          gap: 4px;
          margin: auto 0;
        }
        .img-12 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-26 {
          color: #153d68;
          letter-spacing: 0.15px;
          align-self: start;
          flex-grow: 1;
          white-space: nowrap;
          font: 400 12px/200% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-13 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: stretch;
          max-width: 100%;
        }
        .div-27 {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin-top: 24px;
          justify-content: space-between;
          gap: 12px;
        }
        .div-28 {
          color: rgba(34, 142, 206, 0.9);
          letter-spacing: 0.15px;
          font: 400 15px/160% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-29 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 20px;
          margin: 16px 0 0 16px;
          padding: 3px 0;
        }
        .div-30 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }
        .img-14 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-31 {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/14px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-15 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-32 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 20px;
          margin: 10px 0 0 16px;
          padding: 1px;
        }
        .div-33 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }
        .img-16 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-34 {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/13px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-17 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-35 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 4px;
          margin: 10px 0 0 16px;
          padding: 4px 0;
        }
        .img-18 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-36 {
          color: #153d68;
          letter-spacing: 0.15px;
          margin: auto 0;
          font: 400 12px/200% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-19 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          max-width: 100%;
        }
        .div-37 {
          align-items: center;
          align-self: stretch;
          display: flex;
          margin-top: 24px;
          justify-content: space-between;
          gap: 12px;
        }
        .div-38 {
          color: rgba(34, 142, 206, 0.9);
          letter-spacing: 0.15px;
          font: 400 15px/160% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .div-39 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 20px;
          margin: 16px 0 0 16px;
          padding: 3px 0;
        }
        .div-40 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
        }
        .img-20 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-41 {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/14px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-21 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-42 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 4px;
          margin: 10px 0 0 16px;
          padding: 1px 0;
        }
        .img-22 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-43 {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 400 12px/13px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-23 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-44 {
          justify-content: space-between;
          align-self: start;
          display: flex;
          gap: 4px;
          margin: 10px 0 0 16px;
          padding: 4px 0;
        }
        .img-24 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 12px;
          overflow: hidden;
          align-self: center;
          max-width: 100%;
          margin: auto 0;
        }
        .div-45 {
          color: #153d68;
          letter-spacing: 0.15px;
          margin: auto 0;
          font: 400 12px/200% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .img-25 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
          overflow: hidden;
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
