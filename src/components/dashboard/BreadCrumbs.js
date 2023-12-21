import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function BreadCrumbs(props) {
  const { theme, data } = props;
  return (
    <>
      <div className="BreadCrumbs">
        {data.links.map((link, index) => {
          return (
            <div className="div" key={index}>
              <div className="div-2">
                {link.href ? (
                  <Link
                    href={link.href}
                    style={{
                      color: 'var(--theme-light-color-primary)',
                      textDecoration: 'underline',
                    }}
                  >
                    {link.title}
                  </Link>
                ) : (
                  <div className="title">{link.title}</div>
                )}
              </div>
              {link.href && (
                <div className="div-3">
                  <Image
                    src="/assets/images/icon-arrow-right.svg"
                    width={21}
                    height={8}
                    alt=""
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .BreadCrumbs {
          display: flex;
          flex-direction: row;
          gap: 9px;
        }
        .div {
          align-items: center;
          display: flex;
          gap: 9px;
          flex-direction: row;
        }
        .title {
          color: var(--theme-light-color-primary);
        }
        .div-2 {
          color: var(--Gray-6, #f2f2f2);
          font-size: 14px;
          line-height: 17px;
          text-decoration: none;
        }
        .div-3 {
          color: var(--Gray-6, #f2f2f2);
          font-size: 14px;
          line-height: 17px;
          text-decoration: none;
        }
        .div-3:hover {
          color: var(--Blue-1, #4f3cc9);
        }
        .div-3:active {
          color: var(--Blue-1, #4f3cc9);
        }
      `}</style>
    </>
  );
}
