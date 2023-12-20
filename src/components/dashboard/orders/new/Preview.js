import Image from 'next/image';
import * as React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export default function MyComponent(props) {
  const { theme, data } = props;
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
  return (
    <>
      <div className="PreviewComponent">
        <div className="Container">
          <div className="ColumnProduct">
            {data.productImage && (
              <Image
                src={data.productImage.src}
                width={data.productImage.width}
                height={data.productImage.height}
                style={{ width: '100%', height: 'auto' }}
                alt=""
              />
            )}
          </div>
          <div className="ColumnCharts">
            {data.previewItems.map((previewItem, index) => (
              <div className="row PreviewItem" key={index}>
                <div className="col-6 PreviewItemChart">
                  <PieChart
                    data={[
                      {
                        value: previewItem.pieChart.value,
                        color: previewItem.pieChart.color,
                      },
                    ]}
                    totalValue={100}
                    lineWidth={30}
                    label={({ dataEntry }) => dataEntry.value + '%'}
                    labelStyle={{
                      fontSize: '1.5em',
                      fontFamily: 'sans-serif',
                      fill: previewItem.pieChart.color,
                    }}
                    labelPosition={0}
                  />
                </div>
                <div className="col-6">
                  <div
                    className="PreviewItemTitle"
                    data-tooltip-id={`my-tooltip-${index}`}
                  >
                    <div className="PreviewItemTitleText">
                      {previewItem.title}
                    </div>
                    <Image
                      src="/assets/images/icon-help.svg"
                      width={12}
                      height={12}
                      alt=""
                      style={{
                        aspectRatio: 1,
                        objectFit: 'contain',
                        objectPosition: 'center',
                        width: '12px',
                        overflow: 'hidden',
                        alignSelf: 'center',
                        maxWidth: '100%',
                        margin: 'auto 0',
                        minWidth: '12px',
                        display: width > 780 ? 'none' : 'block',
                      }}
                    />
                  </div>
                  <ReactTooltip
                    id={`my-tooltip-${index}`}
                    place="bottom"
                    openOnClick={true}
                    content={previewItem.description}
                    style={{
                      backgroundColor: 'var(--theme-light-color-secondary)',
                      color: 'var(--color-white)',
                      fontWeight: '600',
                      maxWidth: '200px',
                    }}
                  />
                  <div className="PreviewItemInfo">
                    {previewItem.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .PreviewComponent {
          padding-top: 40px;
          max-width: 447px;
        }
        .PreviewItem {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        @media (max-width: 780px) {
          .PreviewItem {
            gap: 2px;
            align-items: center;
          }
        }
        .PreviewItemChart {
          height: 70px;
        }
        @media (max-width: 800px) {
          .PreviewItemChart {
            height: 40px;
          }
        }
        .Container {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 599px) {
          .Container {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .ColumnProduct {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 36%;
          margin-left: 0px;
        }
        @media (max-width: 780px) {
          .ColumnProduct {
            width: 50%;
          }
        }
        .ColumnCharts {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 64%;
          margin-left: 20px;
          gap: 20px;
        }
        @media (max-width: 780px) {
          .ColumnCharts {
            width: 50%;
            margin-left: 0px;
          }
        }
        .PreviewItemTitle {
          display: flex;
          padding-right: 14px;
          justify-content: space-between;
          gap: 4px;
          cursor: pointer;
        }
        .PreviewItemTitle {
          color: #153d68;
          letter-spacing: 0.15px;
          font: 700 15px/160% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        .PreviewItemInfo {
          color: rgba(21, 61, 104, 0.6);
          letter-spacing: 0.15px;
          font: 700 10px/12px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 780px) {
          .PreviewItemInfo {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
