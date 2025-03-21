/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";

const BacktestContext = createContext(null);

export const BacktestProvider = ({ children }) => {
  // General Configuration
  const [underlyingSymbol, setUnderlyingSymbol] = useState("NIFTY");
  const [optionExpiry, setOptionExpiry] = useState("WEEKLY");
  const [expiryDay, setExpiryDay] = useState("THU");
  const [tradingDays, setTradingDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);

  // Entry/Exit Conditions
  const [entryTime, setEntryTime] = useState("10:15");
  const [exitTime, setExitTime] = useState("14:45");

  // Backtest Settings
  const [capital, setCapital] = useState(100000);
  const [startDate, setStartDate] = useState(new Date("2022-08-01"));
  const [endDate, setEndDate] = useState(new Date("2022-12-30"));

  // Option Legs
  const [optionLegs, setOptionLegs] = useState([]);

  // Backtest Results
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [trades, setTrades] = useState([]);

  // Add a new option leg
  const addOptionLeg = (leg) => {
    setOptionLegs([...optionLegs, leg]);
  };

  // Remove an option leg by index
  const removeOptionLeg = (index) => {
    const updatedLegs = [...optionLegs];
    updatedLegs.splice(index, 1);
    setOptionLegs(updatedLegs);
  };

  // Build config for API
  const buildConfig = () => {
    const config = {
      underlying_asset: {
        symbol: underlyingSymbol,
        option_expiry: optionExpiry,
        expiry_day: expiryDay,
      },
      backtest_settings: {
        capital: capital.toString(),
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        trading_days: tradingDays,
      },
      entry_conditions: {
        entry_time: entryTime,
      },
      exit_conditions: {
        exit_time: exitTime,
      },
      legs:
        optionLegs.length > 0
          ? optionLegs
          : [
              {
                type: "CE",
                action: "BUY",
                strike_selection: { method: "ATM", value: "" },
                lots: 1,
              },
            ],
    };

    setConfig(config);
    return config;
  };

  // Run backtest (in a real app, this would call your API)
  const runBacktest = async () => {
    setIsLoading(true);

    try {
      const config = buildConfig();

      // Mock API response for now
      // In a real app, you would make an API call to your backend
      setTimeout(() => {
        // Mock results
        const mockMetrics = {
          win_rate: 0.4803921568627451,
          sharpe_ratio: -0.045628954596080865,
        };

        const mockTrades = Array.from({ length: 102 }, (_, i) => ({
          entry_date:
            i === 100
              ? "2022-12-28 09:45:00"
              : i === 101
              ? "2022-12-29 09:45:00"
              : `2022-08-${(i % 30) + 1} 09:45:00`,
          exit_date:
            i === 100
              ? "2022-12-28 14:45:00"
              : i === 101
              ? "2022-12-29 14:45:00"
              : `2022-08-${(i % 30) + 1} 14:45:00`,
          entry_underlying_price:
            i === 100
              ? 18108.3
              : i === 101
              ? 18005
              : 18000 + Math.random() * 500,
          exit_underlying_price:
            i === 100
              ? 18159.1
              : i === 101
              ? 18125.5
              : 18000 + Math.random() * 500,
          profit:
            i === 100
              ? 1014.9999999999999
              : i === 101
              ? 4015
              : Math.random() * 2000 - 1000,
        }));

        setMetrics(mockMetrics);
        setTrades(mockTrades);
        setResults({
          metrics: mockMetrics,
          trades: mockTrades,
        });

        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error running backtest:", error);
      setIsLoading(false);
    }
  };

  return (
    <BacktestContext.Provider
      value={{
        // General Configuration
        underlyingSymbol,
        setUnderlyingSymbol,
        optionExpiry,
        setOptionExpiry,
        expiryDay,
        setExpiryDay,
        tradingDays,
        setTradingDays,

        // Entry/Exit Conditions
        entryTime,
        setEntryTime,
        exitTime,
        setExitTime,

        // Backtest Settings
        capital,
        setCapital,
        startDate,
        setStartDate,
        endDate,
        setEndDate,

        // Option Legs
        optionLegs,
        setOptionLegs,
        addOptionLeg,
        removeOptionLeg,

        // Backtest Results
        isLoading,
        config,
        results,
        metrics,
        trades,

        // Functions
        buildConfig,
        runBacktest,
      }}
    >
      {children}
    </BacktestContext.Provider>
  );
};

export const useBacktest = () => {
  const context = useContext(BacktestContext);
  if (!context) {
    throw new Error("useBacktest must be used within a BacktestProvider");
  }
  return context;
};

export default BacktestContext;
