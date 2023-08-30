import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as NodeCanvas from 'canvas';
import CryptoDetailChart from './OHLC';
import { act } from 'react-dom/test-utils';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

describe('OHLC part', () => {
    it('renders the component', async () => {
        await act( async () => {component = render(<CryptoDetailChart props={{currency: 'usd'}} />)});
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        // Test if the component renders without errors

        expect(screen.getByTestId('text-box')).toHaveTextContent('All-Time High: 69045');

      });
});
