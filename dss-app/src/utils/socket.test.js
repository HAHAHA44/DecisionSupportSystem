import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    getCurrentPrice,
    getBasicData,
    getHistoricalPriceData,
    getOHLCData,
  } from './socket'; 
  
  // Mock the fetch function
  global.fetch = jest.fn();
  
  describe('Crypto Functions', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should fetch current price data', async () => {
      const mockResponse = {
        bitcoin: { usd: 50000 },
        ethereum: { usd: 3000 },
      };
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const data = await getCurrentPrice('usd');
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.coingecko.com')
      );

      expect(data).toHaveProperty('bitcoin', { usd: 50000 });
      expect(data).toHaveProperty('ethereum', { usd: 3000 });
  
    });
  
    it('should fetch basic data', async () => {
      const mockResponse = [
        { id: 'bitcoin', name: 'Bitcoin', market_cap: 1000000000 },
        { id: 'ethereum', name: 'Ethereum', market_cap: 500000000 },
        // ...mock data for other cryptocurrencies
      ];
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const data = await getBasicData('usd');
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.coingecko.com')
      );
  
      expect(data).toHaveLength(2);
      expect(data[0]).toHaveProperty('id', 'bitcoin');
      expect(data[0]).toHaveProperty('name', 'Bitcoin');
      expect(data[0]).toHaveProperty('market_cap', 1000000000);
      expect(data[1]).toHaveProperty('id', 'ethereum');
      expect(data[1]).toHaveProperty('name', 'Ethereum');
      expect(data[1]).toHaveProperty('market_cap', 500000000);
    });
  
    it('should fetch historical price data', async () => {
      const mockResponse = {
        prices: [
          [1677721600, 100],
          [1677808000, 120],
        ],
      };
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });
  
      const data = await getHistoricalPriceData(['bitcoin', 'ethereum'], 'usd');
      
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.coingecko.com'),
        expect.objectContaining({'headers': expect.any(Object)})
      );

      console.log(data);
      expect(data).toHaveLength(2);
      expect(data[0]).toHaveProperty('labels', [ '1970/1/20', '1970/1/20' ]);
      expect(data[0]).toHaveProperty('data', [ 100, 120 ]);
      expect(data[1]).toHaveProperty('labels', [ '1970/1/20', '1970/1/20' ]);
      expect(data[0]).toHaveProperty('data', [ 100, 120 ]);
  
    });
  
    it('should fetch OHLC data', async () => {
      const mockResponse = [
        [1677721600000, 100, 120, 80, 110],
        [1677808000000, 120, 130, 90, 100],
      ];
      global.fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const data = await getOHLCData('bitcoin', 'usd');
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('api.coingecko.com')
      );

      expect(data).toHaveLength(2);
      expect(data[0]).toEqual([1677721600000, 100, 120, 80, 110]);
      expect(data[1]).toEqual([1677808000000, 120, 130, 90, 100]);
    });
  });
  