import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import AAPL from "./images/symbols/AAPL.png";
import TSLA from "./images/symbols/TSLA.png";
import MSFT from "./images/symbols/MSFT.png";
import AMZN from "./images/symbols/AMZN.png";
import META from "./images/symbols/META.png";
import NVDA from "./images/symbols/NVDA.png";
import GOOG from "./images/symbols/GOOG.png";
import axios from "axios";
import './StockList.css';

function StockList() {
  const [stocks, setStocks] = useState([
    { scrape: { name: 'APPLE', price: '$145.67', change: '+1.24%', market_cap: '', percent_change: '' }, symbol: AAPL },
    { scrape: { name: 'MSFT', price: '$680.50', change: '-2.12%', market_cap: '', percent_change: '' }, symbol: MSFT },
    { scrape: { name: 'GOOGLE', price: '$145.67', change: '+1.24%', market_cap: '', percent_change: '' }, symbol: GOOG },
    { scrape: { name: 'AMAZON', price: '$680.50', change: '-2.12%', market_cap: '', percent_change: '' }, symbol: AMZN },
    { scrape: { name: 'META', price: '$145.67', change: '+1.24%', market_cap: '', percent_change: '' }, symbol: META },
    { scrape: { name: 'NVIDIA', price: '$680.50', change: '-2.12%', market_cap: '', percent_change: '' }, symbol: NVDA },
    { scrape: { name: 'TESLA', price: '$680.50', change: '-2.12%', market_cap: '', percent_change: '' }, symbol: TSLA },
    // More stock data
  ]);

  const symbols = ["AAPL", "MSFT", "GOOG", "AMZN", "META", "NVDA", "TSLA"];

  useEffect(() => {
    symbols.forEach((tickersymbol, index) => {
      getQuotes(tickersymbol, index);
    });
  }, [stocks]);

  const getQuotes = async (stockSymbol, index) => {
    await axios.post(
      "http://localhost:5000/getquotes",
      { stock_symbol: stockSymbol }
    ).then(response => {
      let stockObject = response.data;
      stockObject.name = stockSymbol;
      const newStocks = stocks;
      newStocks[index].scrape = stockObject;
      setStocks(newStocks);
      console.log(stocks[index].scrape);
    });
  };

  return (

      <div className="grid gap-2 grid-cols-4">

        {stocks.map((stock, index) => (
          <Card className="company">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <div className='stickyRight'>
                <h6 className={`stockMiniText stock-change ${stock.scrape.change.startsWith('+') ? 'up' : 'down'}`}>{stock.scrape.percent_change}</h6>
              </div>

              <h4 className="stockTextColor uppercase font-bold">{stock.scrape.name}</h4>
              <h6 className=' stockMiniText stockTextColor'>{stock.scrape.market_cap}</h6>

            </CardHeader>
            <div className='h-screen flex items-center justify-center'>
              <Image
                alt="Card background"
                className="z-0"
                src={stock.symbol}
              />
            </div>

            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className='flex gap-4 flex-row'>
                <h6 className={` text-small stock-change ${stock.scrape.change.startsWith('+') ? 'up' : 'down'}`} >{stock.scrape.price}</h6>


              </div>

            </CardFooter>

          </Card>
        ))}
      </div>
  );
}

export default StockList;
