import logo from './logo.svg';
import './App.css';
import { useEffect, Fragment, useState } from "react";
import CryptoChart from './components/CryptoChart.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';
import HistoricalChart from './components/HistoryChart';
import OHLCChart from './components/OHLC';
import { getBasicData, basicData } from './utils/socket';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const breadcrumbNameMap = {
  '/price': 'Price',
  '/OHLC': 'OHLC',
  '/price/important': 'Important',
  '/trend': 'Trend',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

function Page() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        DSS
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}


function App() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="App">
      <MemoryRouter initialEntries={['/price']} initialIndex={0}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="*" element={<Page />} />
              </Routes>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  mt: 1,
                }}
                component="nav"
                aria-label="mailbox folders"
              >
                <List>
                  <ListItemLink to="/price"
                  //  open={open} onClick={handleClick} 
                  />
                  {/* <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      <ListItemLink sx={{ pl: 4 }} to="/price/important" />
                    </List>
                  </Collapse> */}
                  <ListItemLink to="/trend" />
                  <ListItemLink to="/OHLC" />
                  {/* <ListItemLink to="/spam" /> */}
                </List>
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Routes>
              <Route path="/trend" element={<HistoricalChart></HistoricalChart>} />
              <Route path="/OHLC" element={<OHLCChart></OHLCChart>} />
              <Route path="/price" element={<CryptoChart></CryptoChart>} />
            </Routes>
          </Item>
        </Grid>
        {/* <Grid item xs={2}>
          <Item>xs=4</Item>
        </Grid> */}
      </Grid>
      {/* <header className="App-header">
        <canvas id="chart"></canvas>
      </header> */}
      </MemoryRouter>
    </div>
  );
}

export default App;
