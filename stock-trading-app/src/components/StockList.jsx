import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import AAPL from "./images/symbols/AAPL.png";
import TSLA from "./images/symbols/TSLA.png";
import MSFT from "./images/symbols/MSFT.png";
import AMZN from "./images/symbols/AMZN.png";
import META from "./images/symbols/META.png";
import NVDA from "./images/symbols/NVDA.png";
import GOOG from "./images/symbols/GOOG.png";

import './StockList.css';

const stocks = [
  { name: 'APPLE', price: '$145.67', change: '+1.24%', symbol: AAPL },
  { name: 'MSFT', price: '$680.50', change: '-2.12%', symbol: TSLA },
  { name: 'GOOGLE', price: '$145.67', change: '+1.24%', symbol: GOOG },
  { name: 'AMAZON', price: '$680.50', change: '-2.12%', symbol: AMZN },
  { name: 'META', price: '$145.67', change: '+1.24%', symbol: META },
  { name: 'NVIDIA', price: '$680.50', change: '-2.12%', symbol: NVDA },
  { name: 'TESLA', price: '$680.50', change: '-2.12%', symbol: GOOG },
  // More stock data
];

const StockList = () => (
  <div className="">
    {/*
    <div className="stock-list">
      {stocks.map((stock, index) => (
        <div className="stock-item" key={index}>
          <span className="stock-name">{stock.name}</span>
          <span className="stock-price">{stock.price}</span>
          <span className={`stock-change ${stock.change.startsWith('+') ? 'up' : 'down'}`}>
            {stock.change}
          </span>
        </div>
      ))}
    </div>
*/}
    <div className="grid gap-2 grid-cols-4">

      {stocks.map((stock, index) => (
        <Card className="company">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="stockTextColor uppercase font-bold">{stock.name}</h4>

          </CardHeader>
          <div className='h-screen flex items-center justify-center'>
            <Image
              alt="Card background"
              className="z-0"
              src={stock.symbol}
            />
          </div>

          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h6  className={` text-small stock-change ${stock.change.startsWith('+') ? 'up' : 'down'}`} >{stock.price}</h6>
          </CardFooter>

        </Card>
      ))}
    </div>
  </div>

);

export default StockList;
