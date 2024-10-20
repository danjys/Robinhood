import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const subscribeToStock = (stockSymbol, cb) => {
  socket.emit("stock_request", { stock_symbol: stockSymbol });
  socket.on("stock_update", (data) => cb(null, data));
};
