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
import { cryptoList, prices, getHistoricalPriceData } from "../utils/socket";

let chart;

window.getHistoricalPriceData = getHistoricalPriceData;



function HistoricalChart(props) {
    // const [prices, setPrices] = useState({});
    const [cryptoName, setCryptoName] = useState([cryptoList[0]]);


    async function refreshChart(values) {
        if (!values) values = cryptoName;
        const res = await getHistoricalPriceData(values, props.currency);
        console.log(values, res);
        chart && (chart.data.datasets = res.map((item, index) => {
            item.label = values[index];
            return item;
        }));
        chart.data.labels = values;
        chart.update();
    }

    useEffect(() => {
        const ctx = document.getElementById('bitcoinChart').getContext('2d');
        async function fetchData() {
            const bitcoinPriceData = await getHistoricalPriceData(cryptoName,props.currency);
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

    useEffect(() => {
        console.log('hsitorical currency changed');
        refreshChart(cryptoName);
    }, [props.currency]);

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
        refreshChart(values);
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
                    data-testid="cp-multiple-checkbox-label"
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
