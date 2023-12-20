import Image from 'next/image';
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function OptionItemMenu(props) {
  const { option } = props;
  const [isAdded, setIsAdded] = React.useState(false);
  return (
    <>
      <div className="OptionItemMenu">
        <div data-tooltip-id="my-tooltip-1" className="OptionItemMenuInfo">
          <Image
            src="/assets/images/icon-help.svg"
            width={12}
            height={12}
            alt=""
          />
          <div className="OptionItemMenuInfoText">{option.text}</div>
        </div>
        <ReactTooltip
          id="my-tooltip-1"
          place="bottom"
          openOnClick={true}
          content={option.help}
          style={{
            backgroundColor: 'var(--theme-light-color-secondary)',
            color: 'var(--color-white)',
            fontWeight: '600',
            maxWidth: '200px',
          }}
        />
        <div
          className="OptionItemMenuRemove"
          style={{ display: isAdded ? 'flex' : 'none' }}
          onClick={() => setIsAdded(false)}
        >
          <Image
            src="/assets/images/icon-remove.svg"
            width={16}
            height={16}
            alt="Remove"
          />
        </div>
        <div
          className="OptionItemMenuAdd"
          style={{ display: !isAdded ? 'flex' : 'none' }}
          onClick={() => setIsAdded(true)}
        >
          <Image
            src="/assets/images/icon-add.svg"
            width={16}
            height={16}
            alt="Add"
          />
        </div>
      </div>
      <style jsx>{`
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
          cursor: pointer;
        }
        .OptionItemMenuRemove,
        .OptionItemMenuAdd {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
      `}</style>
    </>
  );
}
