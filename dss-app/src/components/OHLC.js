import { useEffect, Fragment, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// let prices = {}
import { basicData, cryptoList, prices } from "../utils/socket";
import * as echarts from 'echarts';
import { Box, Typography } from "@mui/material";

let chart;
const upColor = '#00da3c';
const downColor = '#ec0000';

const CharacterList = [
  {
    name: 'All-Time High',
    suffix: '',
    value: 'ath',
  },
  {
    name: 'All-Time High change percentage',
    suffix: '%',
    value: 'ath_change_percentage',
  },
  {
    name: 'ATH date',
    suffix: '',
    value: 'ath_date',
  },
  {
    name: 'All-Time Low',
    suffix: '',
    value: 'atl',
  },
  {
    name: 'All-Time Low change percentage',
    suffix: '',
    value: 'atl_change_percentage',
  },
  {
    name: 'ATL date',
    suffix: '',
    value: 'atl_date',
  },
  {
    name: 'Circulating Supply',
    suffix: '',
    value: 'circulating_supply',
  },
  {
    name: 'Current Price',
    suffix: '',
    value: 'current_price',
  },
  {
    name: 'Fully Diluted Valuation',
    suffix: '',
    value: 'fully_diluted_valuation',
  },
  {
    name: 'High Price in 24h',
    suffix: '',
    value: 'high_24h',
  },
  {
    name: 'Low Price in 24h',
    suffix: '',
    value: 'low_24h',
  },
  {
    name: 'Market Cap',
    suffix: '$',
    value: 'market_cap',
  },
  {
    name: 'Market Cap Change in 24h',
    suffix: '',
    value: 'market_cap_change_24h',
  },
  {
    name: 'Max Supply',
    suffix: '',
    value: 'max_supply',
  },
  {
    name: 'Price Change in 24h',
    suffix: '',
    value: 'price_change_24h',
  },
  {
    name: 'Price Change Percentage in 24h',
    suffix: '',
    value: 'price_change_percentage_24h',
  },
  {
    name: 'Updated Time',
    suffix: '',
    value: 'last_updated',
  },
  
]

function OHLCChart() {
  // const [prices, setPrices] = useState({});
  const [symbol, setSymbol] = useState(cryptoList[0]);
  const [info, setInfo] = useState({});

  const handleChangeSelect = (event) => {
    setSymbol(event.target.value);
    setInfo(basicData.find(item => item.id === event.target.value));
    console.log(chart);
    chart && chart.dispose();
    
    chart = drawOHLCChart(event.target.value);
  };

  async function getOHLCData(symbol, currency='usd') {

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

  function splitData(rawData) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(new Date(rawData[i][0]).toLocaleDateString());
      rawData[i][0] = i;
      values.push(rawData[i].slice(1));
    }
    return {
      categoryData: categoryData,
      values: values
    };
  }

  function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }

  function renderItem(params, api) {
    var xValue = api.value(0);
    var openPoint = api.coord([xValue, api.value(1)]);
    var closePoint = api.coord([xValue, api.value(2)]);
    var lowPoint = api.coord([xValue, api.value(3)]);
    var highPoint = api.coord([xValue, api.value(4)]);
    var halfWidth = api.size([1, 0])[0] * 0.35;
    var style = api.style({
      stroke: api.visual('color')
    });
    return {
      type: 'group',
      children: [
        {
          type: 'line',
          shape: {
            x1: lowPoint[0],
            y1: lowPoint[1],
            x2: highPoint[0],
            y2: highPoint[1]
          },
          style: style
        },
        {
          type: 'line',
          shape: {
            x1: openPoint[0],
            y1: openPoint[1],
            x2: openPoint[0] - halfWidth,
            y2: openPoint[1]
          },
          style: style
        },
        {
          type: 'line',
          shape: {
            x1: closePoint[0],
            y1: closePoint[1],
            x2: closePoint[0] + halfWidth,
            y2: closePoint[1]
          },
          style: style
        }
      ]
    };
  }

  async function drawOHLCChart(symbol, currency) {
    const rawData = await getOHLCData(symbol, currency);
    var data = splitData(rawData);
    console.log(data);
    const chartDom = document.getElementById('ohlcChart');
    const myChart = echarts.init(chartDom, { width: 'auto' });
    const option = {
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          const obj = {
            top: 10
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        }
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all'
          }
        ],
        label: {
          backgroundColor: '#777'
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ['lineX', 'clear']
          }
        }
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: downColor
          },
          {
            value: -1,
            color: upColor
          }
        ]
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '50%'
        },
        {
          left: '10%',
          right: '8%',
          top: '63%',
          height: '16%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 98,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '80%',
          start: 98,
          end: 100
        }
      ],
      series: [
        {
          name: 'Dow-Jones index',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: undefined,
            borderColor0: undefined
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          },
          itemStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          },
          itemStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          },
          itemStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          },
          itemStyle: {
            opacity: 0.3
          }
        }
      ]
    }
    myChart.setOption(option, true);
    chart = myChart;
    return myChart;
  };

  useEffect(() => {
    drawOHLCChart(symbol);
    
    setTimeout(() => {
      setInfo(basicData.find(item => item.id === symbol));
    }, 1000);
    return () => {
      chart && chart.dispose();
    }
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  return (
    <div className="CryptoChart">
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={symbol}
          label="symbol"
          onChange={handleChangeSelect}
          defaultValue={cryptoList[0]}
        >
          {cryptoList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
      <header className="OHLC-header">
        <div id="ohlcChart" style={{ width: '100%', height: '600px' }}></div>
      </header>
      {
        info && info.id && 
        <Box sx={{ m: 2 }}>
          {CharacterList.map(item => (<Fragment><Typography color={'blue'} variant="subtitle" gutterBottom> {item.name}</Typography><Typography gutterBottom  variant="subtitle">: {info[item.value] + item.suffix} </Typography><div></div></Fragment>))}
          {/* <Typography variant="subtitle" gutterBottom>: {info.ath} </Typography>
          <Typography variant="subtitle" gutterBottom>All-Time High change percentage: {info.ath_change_percentage}%</Typography> */}
        </Box>
      }
    </div>
  );
}

export default OHLCChart;
