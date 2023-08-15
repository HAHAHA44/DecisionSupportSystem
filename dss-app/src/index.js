import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { startPriceWs } from './utils/socket';

startPriceWs();
const root = ReactDOM.createRoot(document.getElementById('root'));

// let prices = {}

// const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,litecoin,maker,dogecoin,stellar,algorand,basic-attention-coin,compound,celo')
// socket.onmessage = e => {
//     console.log(e);
//     let data = JSON.parse(e.data);
//     Object.keys(data).forEach(ticker => {
//         if (!prices[ticker]) {
//             prices[ticker] = { price: parseFloat(data[ticker])};
            
//             return;
//         }
//         prices[ticker] = { price: parseFloat(data[ticker])};
//     });
// };

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
