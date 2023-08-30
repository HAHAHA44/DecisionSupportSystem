import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; // Make sure to provide the correct path to your App component
import * as NodeCanvas from 'canvas';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

describe('App component', () => {
  it('renders the component', () => {
    render(<App />);
    
    // Test if the component renders without errors
    const appElement = document.getElementById('dss-app');
    expect(appElement).toBeInTheDocument();
  });

  it('check the expected elements exist', () => {
    render(<App />);

    const currencyMenuButton = screen.getByLabelText('crc-iconbuttion');
    expect(currencyMenuButton).toBeTruthy();
    
    const CurrentPrice = screen.getByText(/Current Price/i);
    expect(CurrentPrice).toBeTruthy();

    const HistoricalPrice = screen.getByText(/Historical Price/i);
    expect(HistoricalPrice).toBeTruthy();

    const CryptoDetail = screen.getByText(/Crypto Detail/i);
    expect(CryptoDetail).toBeTruthy();
  });

  it('check the change unit currency button', () => {
    render(<App />);

    const currencyMenuButton = screen.getByLabelText('crc-iconbuttion');
    fireEvent.click(currencyMenuButton);
    
    const GBPItem = screen.getByText(/GBP/i);
    expect(GBPItem).toBeTruthy();

    const CNYItem = screen.getByText(/CNY/i);
    expect(CNYItem).toBeTruthy();

    const EURItem = screen.getByText(/EUR/i);
    expect(EURItem).toBeTruthy();

    const JPYItem = screen.getByText(/JPY/i);
    expect(JPYItem).toBeTruthy();
  });


  it('updates the current currency when a currency is chosen from the menu', () => {
    render(<App />);
    
    // Open the currency menu
    const currencyMenuButton = screen.getByLabelText('crc-iconbuttion');
    fireEvent.click(currencyMenuButton);

    // Choose a currency from the menu
    const currencyOption = screen.getByText('EUR');
    userEvent.click(currencyOption);

    // Check if the current currency is updated
    const currentCurrencyText = screen.getByText('EUR');
    expect(currentCurrencyText).toBeInTheDocument();
  });

  it('opens and closes the currency menu on button click', () => {
    render(<App />);
    
    // Initially, the menu is closed
    const currencyMenu = screen.queryByRole('menu');
    expect(currencyMenu).not.toBeInTheDocument();

    // Open the currency menu
    const currencyMenuButton = screen.getByLabelText('crc-iconbuttion');
    fireEvent.click(currencyMenuButton);

    // Check if the menu is open
    const openCurrencyMenu = screen.queryByRole('menu');
    expect(openCurrencyMenu).toBeInTheDocument();
  });

  it('Current Price page have canvas', () => {
    render(<App />);

    const CurrentPrice = screen.getByText(/Current Price/i);
    fireEvent.click(CurrentPrice);

    let chart = document.getElementById('current-price-chart');
    expect(chart).toBeInTheDocument();
  });

  it('historical Price page have canvas', () => {
    render(<App />);

    const HistoricalPrice = screen.getByText(/Historical Price/i);
    fireEvent.click(HistoricalPrice);

    let chart = document.getElementById('bitcoinChart');
    expect(chart).toBeInTheDocument();
  });

  it('Crypto Detail page have canvas', () => {
    render(<App />);

    const CryptoDetail = screen.getByText(/Crypto Detail/i);
    fireEvent.click(CryptoDetail);

    let chart = document.getElementById('ohlcChart');
    expect(chart).toBeInTheDocument();
  });

  it('Current Price page have crypto selector', () => {
    const {getByTestId} = render(<App />);

    const CurrentPrice = screen.getByText(/Current Price/i);
    fireEvent.click(CurrentPrice);

    const Selector = screen.getByTestId('cp-multiple-checkbox-label');
    fireEvent.click(Selector);

    expect(screen.getByTestId('cp-multiple-checkbox-label')).toHaveTextContent('bitcoin');
  });

  it('Historical Price page have crypto selector', () => {
    const {getByTestId} = render(<App />);

    const HistoricalPrice = screen.getByText(/Historical Price/i);
    fireEvent.click(HistoricalPrice);

    const Selector = screen.getByTestId('cp-multiple-checkbox-label');
    fireEvent.click(Selector);

    expect(screen.getByTestId('cp-multiple-checkbox-label')).toHaveTextContent('bitcoin');
  });

  it('Crypto Detail page have crypto selector', () => {
    const {getByTestId} = render(<App />);

    const CryptoDetail = screen.getByText(/Crypto Detail/i);
    fireEvent.click(CryptoDetail);

    const Selector = screen.getByTestId('cp-simple-checkbox-label');
    fireEvent.click(Selector);

    expect(screen.getByTestId('cp-simple-checkbox-label')).toHaveTextContent('bitcoin');


  });

});
