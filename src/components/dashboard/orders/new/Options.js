import Image from 'next/image';
import * as React from 'react';
import OptionItemMenu from './OptionItemMenu';

export default function MyComponent(props) {
  const { theme, product, onChangeOption } = props;

  return (
    <>
      <div className="OptionsCard">
        <div className="title">{product.productName}</div>
        <div className="subtitle">{product.productSubtitle}</div>
        {product.addons.map((addon, index) => (
          <div className="OptionItem" key={index}>
            <div className="OptionItemTitle">
              <Image
                src={addon.icon.src}
                width={addon.icon.width}
                height={addon.icon.height}
                alt=""
              />
              <div className="OptionItemTitleText">{addon.name}</div>
            </div>
            <div className="OptionItemBody">
              {addon.options.map((option, index) => (
                <OptionItemMenu
                  option={option}
                  addon={addon}
                  key={index}
                  index={index}
                  onChangeOption={onChangeOption}
                />
              ))}
            </div>
          </div>
        ))}
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
      `}</style>
    </>
  );
}
