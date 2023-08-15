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
import { cryptoList, prices } from "../utils/socket";

let chart;

async function getBitcoinPriceData(cryptoName, currency = 'usd') {
    // const apiKey = 'YOUR_API_KEY'; // 替换为您的 CoinGecko API 密钥
    let startDate = '2022-01-01'; // 开始日期
    let endDate = '2022-06-30';   // 结束日期

    try {
        return Promise.all(cryptoName.map(item => fetch(`https://api.coingecko.com/api/v3/coins/${item}/market_chart/range?vs_currency=${currency}&from=${Math.floor(new Date(startDate).getTime() / 1000)}&to=${Math.floor(new Date(endDate).getTime() / 1000)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
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

window.getBitcoinPriceData = getBitcoinPriceData;

function HistoricalChart() {
    // const [prices, setPrices] = useState({});
    const [cryptoName, setCryptoName] = useState([cryptoList[0]]);


    useEffect(() => {
        const ctx = document.getElementById('bitcoinChart').getContext('2d');
        async function fetchData() {
            const bitcoinPriceData = await getBitcoinPriceData(cryptoName);
            return bitcoinPriceData;
          }
        
        fetchData().then((cryptoPrices) => {
            cryptoPrices = cryptoPrices[0]
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: cryptoPrices.labels,
                    datasets: [
                        {
                            label: 'Bitcoin',
                            data: cryptoPrices.data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            // fill: true,
                        },
                    ],
                },
                options: {
                    interaction: {
                        axis: 'xy',
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            type: 'category',
                            labels: cryptoPrices.labels,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        });
        


        // chart.data.labels = Object.keys(prices);
        // chart.data.datasets[0].data = Object.values(prices).map(p => p.price);
        // chart.update();

        return () => {
            chart && chart.destroy();
        }
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         chart.data.labels = cryptoName;
    //         chart.data.datasets[0].data = cryptoName.map(name => {
    //             return prices[name]?.price;
    //         });
    //         chart.update();
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, [cryptoName])

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


    const handleChange = async (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        const values = typeof value === 'string' ? value.split(',') : value;
        setCryptoName(
            // On autofill we get a stringified value.
            values
        );
        const res = await getBitcoinPriceData(values);
        console.log(values, res);
        chart && (chart.data.datasets = res.map((item, index) => {
            item.label = value[index];
            return item;
        }));
        chart.data.labels = values;
        chart.update();
        console.log(chart.data.datasets);
    };

    return (
        <div className="CryptoChart">
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Cryptos</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={cryptoName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Cryptos" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {cryptoList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={cryptoName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <header className="CryptoChart1-header">
                <canvas id="bitcoinChart"></canvas>
            </header>
        </div>
    );
}

export default HistoricalChart;
