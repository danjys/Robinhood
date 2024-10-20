import React from 'react';
import './StockList.css';

const stocks = [
    { name: 'Apple', price: '$145.67', change: '+1.24%' },
    { name: 'Tesla', price: '$680.50', change: '-2.12%' },
    // More stock data
];

const StockList = () => (
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
);

export default StockList;
