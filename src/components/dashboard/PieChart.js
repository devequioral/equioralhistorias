import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function PieChartComponent(props) {
  const { product, addon } = props;
  const calcPercentage = (addon) => {
    let percentage = addon.defaultPercent;
    addon.options.forEach((option) => {
      if (option.selected) {
        percentage += option.percent;
      }
    });
    return percentage;
  };
  const [data, setData] = useState([
    { value: calcPercentage(addon), color: addon.color },
  ]);
  useEffect(() => {
    // recalculate data[0].value here based on product
    const newValue = calcPercentage(addon); // assuming calcPercentage is a function that calculates the percentage

    setData([{ value: newValue, color: addon.color }]);
  }, [product]);
  return (
    <PieChart
      data={data}
      totalValue={100}
      lineWidth={30}
      label={({ dataEntry }) => dataEntry.value + '%'}
      labelStyle={{
        fontSize: '1.5em',
        fontFamily: 'sans-serif',
        fill: addon.color,
      }}
      labelPosition={0}
    />
  );
}
