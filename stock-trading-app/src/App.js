import React, { useState, useEffect } from "react";
import axios from "axios";
import { subscribeToStock } from "./services/sockets";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from './components/NavBar'; // Ensure these components are properly imported
import Portfolio from './components/Portfolio';
import Research from './components/Research';
import Invest from './components/Invest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

import './App.css'; // Your main CSS file

function App() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockPrice, setStockPrice] = useState(0);
  const [user, setUser] = useState(null);

  // Login the user
  const loginUser = async () => {
    const response = await axios.post("http://localhost:5000/login", {
      username: "user1",
      password: "password123",
    });
    setUser(response.data.access_token);
  };

  // Subscribe to stock updates
  useEffect(() => {
    subscribeToStock(stockSymbol, (err, data) => {
      if (err) return;
      setStockPrice(data.price);
    });
  }, [stockSymbol]);

  // Buy stock
  const buyStock = async () => {
    if (user) {
      await axios.post(
        "http://localhost:5000/buy",
        { stock_symbol: stockSymbol, quantity: 1 },
        { headers: { Authorization: `Bearer ${user}` } }
      );
    }
  };

  return (
    <NextUIProvider>
      <HelmetProvider>
        <div className="App">
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
              rel="stylesheet"
            />
          </Helmet>

          <Router>
            <NavBar />
            <Routes>
              {/* Default landing page */}
              <Route path="/" element={<Portfolio />} />
              {/* Other routes */}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/research" element={<Research />} />
              <Route path="/invest" element={<Invest />} />
            </Routes>
          </Router>

          {/*
          <h1>Stock Trading App</h1>
          <div>
            <label>Stock Symbol:</label>
            <input
              type="text"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
            />
          </div>
          <div>
            <h2>Stock Price: ${stockPrice}</h2>
          </div>
          <button onClick={buyStock}>Buy 1 Share</button>
          */}
        </div>
      </HelmetProvider>
    </NextUIProvider>
  );
}

export default App;

