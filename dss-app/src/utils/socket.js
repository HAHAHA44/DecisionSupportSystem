
export const prices = {};
export const cryptoList = [
    'bitcoin','ethereum','maker','dogecoin','algorand','celo'
  ]

export const basicData = [];
export function startPriceWs() {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=' + cryptoList.join(','))
    // const socket = new WebSocket('wss://ws.coincap.io/trades/binance')
    socket.onmessage = e => {
        let data = JSON.parse(e.data);
        Object.keys(data).forEach(ticker => {

        if (!prices[ticker]) {
            prices[ticker] = { price: parseFloat(data[ticker]) };

            return;
        }
        prices[ticker] = { price: parseFloat(data[ticker]) };
        });

        // console.log(prices)
    };

}

export async function getBasicData() {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
      const data = await response.json();
      basicData.push(...data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }