import Image from 'next/image';
import * as React from 'react';
import OptionItemMenu from './OptionItemMenu';

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
                <OptionItemMenu option={option} key={index} />
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
