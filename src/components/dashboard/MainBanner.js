import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function MainBanner(props) {
  const { data } = props;
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const styleMainBanner = () => {
    if (width > 992) {
      return {
        width: '100%',
        height: 'auto',
      };
    }
    return {
      width: 'auto',
      height: '100%',
    };
  };
  return (
    <>
      <div className="div">
        <div className="div-2">
          {data.image && (
            <div className="cntMainImage">
              <Image
                src={data.image.src}
                width={data.image.width}
                height={data.image.height}
                alt="Main Banner"
                style={styleMainBanner()}
              />
            </div>
          )}
          <div className="div-3">{data.title}</div>
          <div className="div-4">{data.description}</div>
          <div className="div-5">
            {data.button01 && (
              <Link href={data.button01.href}>
                <div className="div-6">
                  {data.button01.icon && (
                    <Image
                      src={data.button01.icon.src}
                      width={data.button01.icon.width}
                      height={data.button01.icon.height}
                      alt=""
                    />
                  )}
                  <div className="div-7">{data.button01.label}</div>
                </div>
              </Link>
            )}
            {data.button02 && (
              <Link href={data.button02.href}>
                <div className="div-8">
                  {data.button01.icon && (
                    <Image
                      src={data.button02.icon.src}
                      width={data.button02.icon.width}
                      height={data.button02.icon.height}
                      alt=""
                    />
                  )}
                  <div className="div-9">{data.button02.label}</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .div {
          justify-content: center;
          display: flex;
          max-width: 721px;
          flex-direction: column;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .div {
            margin: 0 auto;
          }
        }
        .div-2 {
          disply: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          display: flex;
          min-height: 306px;
          width: 100%;
          align-items: start;
          padding: 19px 80px 19px 20px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            padding-right: 20px;
          }
        }
        .cntMainImage {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }

        .div-3 {
          position: relative;
          color: #fff;
          max-width: 451px;
          font: 400 24px/32px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
          }
        }
        .div-4 {
          position: relative;
          color: #fff;
          letter-spacing: 0.15px;
          margin-top: 9px;
          max-width: 451px;
          font: 400 16px/24px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
          }
        }
        .div-5 {
          position: relative;
          display: flex;
          margin-top: 9px;
          padding-bottom: 10px;
          gap: 14px;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        .div-6 {
          justify-content: space-between;
          align-items: center;
          border-radius: 10px;
          box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.2);
          background-color: #4f3cc9;
          display: flex;
          gap: 4px;
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
        .div-8 {
          justify-content: space-between;
          align-items: center;
          border-radius: 10px;
          box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.2);
          background-color: #4f3cc9;
          display: flex;
          gap: 8px;
          padding: 8px 14px;
        }
        .img-3 {
          aspect-ratio: 1.05;
          object-fit: contain;
          object-position: center;
          width: 21px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-9 {
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
          .div-9 {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
