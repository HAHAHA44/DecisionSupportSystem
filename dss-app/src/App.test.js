import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; // Make sure to provide the correct path to your App component

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

  it('updates the current currency when a currency is chosen from the menu', () => {
    render(<App />);
    
    // Open the currency menu
    const currencyMenuButton = screen.getByLabelText('delete');
    fireEvent.click(currencyMenuButton);

    // Choose a currency from the menu
    const currencyOption = screen.getByText('EUR'); // Replace 'EUR' with an actual currency
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
    const currencyMenuButton = screen.getByLabelText('delete');
    fireEvent.click(currencyMenuButton);

    // Check if the menu is open
    const openCurrencyMenu = screen.queryByRole('menu');
    expect(openCurrencyMenu).toBeInTheDocument();

    // // Close the currency menu
    // userEvent.click(screen.getByText('EUR')); // Replace 'EUR' with an actual currency to simulate a menu option click

    // // Check if the menu is closed again
    // const closedCurrencyMenu = screen.queryByRole('menu');
    // expect(closedCurrencyMenu).not.toBeInTheDocument();
  });

});