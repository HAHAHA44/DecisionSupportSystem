
export const prices = {};
export const cryptoList = [
    'bitcoin','ethereum','maker','dogecoin','algorand','celo'
  ]

export const currencies = ['usd', 'gbp', 'cny', 'eur', 'jpy'];

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

        console.log(prices)
    };
}

export async function getCurrentPrice(currency = 'usd') {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=${currency}&ids=${cryptoList.join(',')}&include_last_updated_at=true`);
    const data = await response.json();
    Object.keys(data).forEach(ticker => {

      if (!prices[ticker]) {
          prices[ticker] = { price: parseFloat(data[ticker][currency]) };
          return;
      }
      prices[ticker] = { price: parseFloat(data[ticker][currency]) };
    });
    console.log(prices);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getBasicData(currency = 'usd') {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
      const data = await response.json();
      basicData.length = 0;
      basicData.push(...data);
      console.log('get basic data,', basicData);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  export async function getHistoricalPriceData(cryptoName, currency = 'usd') {
    // const apiKey = 'YOUR_API_KEY'; 
    let startDate = '2022-01-01'; // 开始日期
    let endDate = '2022-06-30';   // 结束日期

    try {
        return Promise.all(cryptoName.map(item => fetch(`https://api.coingecko.com/api/v3/coins/${item}/market_chart/range?vs_currency=${currency}&from=${Math.floor(new Date(startDate).getTime() / 1000)}&to=${Math.floor(new Date(endDate).getTime() / 1000)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
          return res.json();
        })
        .then(jsonItem => {
            return {
                labels: jsonItem.prices.map(item => new Date(item[0]).toLocaleDateString()), // timestamp to date
                data: jsonItem.prices.map(item => item[1]),
            }
        })))
        // const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${currency}&from=${Math.floor(new Date(startDate).getTime() / 1000)}&to=${Math.floor(new Date(endDate).getTime() / 1000)}`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        // const data = await response.json();

        // return {
        //     labels: data.prices.map(item => new Date(item[0]).toLocaleDateString()), // 时间戳转换为日期字符串
        //     prices: data.prices.map(item => item[1]),
        // };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function getOHLCData(symbol, currency='usd') {

  try {
    // const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&from=${Math.floor(new Date(startDate).getTime() / 1000)}&to=${Math.floor(new Date(endDate).getTime() / 1000)}`);
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}/ohlc?vs_currency=${currency}&days=max`);
    // const response = await fetch(`https://api.coincap.io/v2/candles?exchange=binance&interval=h8&baseId=btc&quoteId=usd&start=0&end=${new Date().getTime()}`);
    const data = await response.json();

    return data.map(item => {
      return [item[0], item[1], item[2], item[3], item[4]]; // [timestamp, open, high, low, close]
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}