import { useEffect, Fragment, useState } from "react";
import Chart from 'chart.js/auto';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// let prices = {}
import { cryptoList, getCurrentPrice, prices } from "../utils/socket";

let chart;

function CryptoChart(props) {
  // const [prices, setPrices] = useState({});
  const [cryptoName, setCryptoName] = useState(cryptoList);


  async function updateChart(request) {
    if (request) {
      await getCurrentPrice(props.currency);
    }
    chart.data.labels = cryptoName;
    chart.data.datasets[0].data = cryptoName.map(name => {
      return prices[name]?.price;
    });
    chart.update();
  }

  useEffect(() => {
    const ctx = document.getElementById('current-price-chart');
    chart = new Chart(ctx, {
      //Type of the chart
      type: 'line',
      data: {
        //labels on x-axis
        labels: [],
        datasets: [{
          //The label for the dataset which appears in the legend and tooltips.
          label: 'Price',
          //data for the line
          data: [],
          //styling of the chart
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        tooltip: {
          xAlign: 'top',
          yAlign: 'top',
        },
        plugins: [{
          afterDatasetUpdate: chart => {
            // if (!chart.tooltip.getActiveElements().length) {
              chart.tooltip.setActiveElements([
                {
                  datasetIndex: 0,
                  index: 2,
                }, {
                  datasetIndex: 1,
                  index: 2,
                }
              ],
              {
                x: (chart.chartArea.left + chart.chartArea.right) / 2,
                y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
              });
            // }
            //   chart.tooltip.setActiveElements([{
            //     datasetIndex: 0,
            //     index: chart.data.datasets[0].data.length - 1
            //   }]);
            //   chart.update();
            // }
          }
        }],
        interaction: {
          mode: 'dataset',
          intersect: false
        },
        scales: {
          //make sure Y-axis starts at 0
          y: {
            beginAtZero: true
          }
        },
      }
    });

    window.chart = chart;
    
    chart.data.labels = Object.keys(prices);
    chart.data.datasets[0].data = Object.values(prices).map(p => p.price);
    chart.update();

    return () => {
      chart.destroy();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateChart();
    }, 200);

    const interval = setInterval(() => {
      updateChart();
    }, 30*1000);

    console.log('set interval', interval);
  
    return () => {
      console.log('clear interval:', interval);
      clearInterval(interval);
    }
  }, [cryptoName])

  useEffect(() => {
    setTimeout(() => {
      updateChart(true);
    }, 200);
  }, [props.currency])

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


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setCryptoName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(cryptoName)
  };

  return (
    <div className="CryptoChart">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="cp-multiple-checkbox-input">Cryptos</InputLabel>
        <Select
          labelId="cp-multiple-checkbox-label"
          id="cp-multiple-checkbox"
          multiple
          data-testid="cp-multiple-checkbox-label"
          value={cryptoName}
          onChange={handleChange}
          input={<OutlinedInput label="Cryptos" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cryptoList.map((name) => (
            <MenuItem key={name} value={name} data-testid={name+'-cp-menu-item'}>
              <Checkbox checked={cryptoName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <header className="CryptoChart-header">
        <canvas id="current-price-chart"></canvas>
      </header>
    </div>
  );
}

export default CryptoChart;
