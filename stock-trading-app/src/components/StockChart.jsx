
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const StockChart = () => {
    const [primaryGreen, setPrimaryGreen] = useState('#00C805'); // Fallback color
  
    useEffect(() => {
      const rootStyle = getComputedStyle(document.documentElement);
      const green = rootStyle.getPropertyValue('--primary-green').trim();
      if (green) {
        setPrimaryGreen(green);
      }
    }, []);
  
    const data = [
      { name: 'Mon', price: 150 },
      { name: 'Tue', price: 155 },
      { name: 'Wed', price: 160 },
      { name: 'Thu', price: 165 },
      { name: 'Fri', price: 170 },
    ];
  
    return (
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke={primaryGreen} />
      </LineChart>
    );
  };

export default StockChart;
