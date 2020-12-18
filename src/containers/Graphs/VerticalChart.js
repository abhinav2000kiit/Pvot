import React from 'react';
import { BarChart, Bar, Cell, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     pv: 2
//   },
//   {
//     name: 'Page B',
//     pv: -1.5
//   },
//   {
//     name: 'Page C',
//     pv: -9
//   },
//   {
//     name: 'Page D',
//     pv: 3
//   }
// ];

const VerticalChart = ({ data }) => {
  //   const jsfiddleUrl = 'https://jsfiddle.net/alidingling/q68cz43w/';
  console.log('@@@@@@@@@@@@', data);

  return (
    // <BarChart
    //   width={400}
    //   height={500}
    //   data={data}
    //   margin={{
    //     top: 5,
    //     right: 0,
    //     left: 0,
    //     bottom: 5
    //   }}
    // >
    //   <CartesianGrid strokeDasharray='3 3' />
    //   <XAxis dataKey='month' />
    //   <YAxis dataKey='returns' />
    //   <Tooltip />
    //   <Legend />
    //   <ReferenceLine y={0} stroke='#000' />
    //   <Bar dataKey='returns' fill='#8884d8' />
    // </BarChart>
    <BarChart
      width={350}
      height={500}
      data={data}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      layout='vertical'
      stackOffset='expand'
      maxBarSize={30}
    >
      <CartesianGrid x='2' y='2' />
      <XAxis
        dataKey='returns'
        type='number'
        // padding={{ left: 5, right: 5 }}
        // allowDataOverflow='true'
        domain={[-1, 1]}
        // domain={['dataMin', 'dataMax']}
        tickFormatter={returns => `${returns}%`}
      />
      <YAxis dataKey='month' type='category' />
      <Tooltip />
      {/* <Legend payload= /> */}
      <ReferenceLine y={0} stroke='#000' />
      <Bar
        dataKey='returns'
        fill={'#8884d8'}
        isAnimationActive='true'
        animationEasing='ease-in-out'
        label={{ fill: '#000', fontSize: 15 }}
      >
        {data.map((entry, index) => {
          const color = entry.returns > 0 ? '#8DF30C' : '#F91D12';
          return <Cell fill={color} />;
        })}
      </Bar>
    </BarChart>
  );
};

export default VerticalChart;
