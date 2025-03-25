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

  const runBacktest = async () => {
    setIsLoading(true);

    try {
      const config = buildConfig();

      const fullConfig = {
        ...config,
        underlying_asset: {
          ...config.underlying_asset,
          atm_source: "FUTURES",
          exchange: "NSE",
          currency: "INR",
          lot_size: 75,
          multiplier: 50,
        },
        execution: {
          order_type: "limit",
          time_in_force: "GTC",
          slippage: "0.1%",
          margin: "use_available",
          order_validity: "day",
        },
        re_entry: {
          max_retries: 3,
          cooldown_minutes: 15,
          re_entry_conditions: { price_reversal: true },
        },
        risk_management: {
          skip_trade_if_insufficient_funds: true,
          scale_lots_if_insufficient_funds: false,
          risk_per_trade_pct: 0.02,
          max_daily_loss_pct: 0.05,
          max_drawdown_pct: 0.2,
        },
        backtest_settings: {
          ...config.backtest_settings,
          position_sizing: "fixed_lots",
          commission: "₹20 per trade",
          data_frequency: "intraday",
          data_source: "local_csv",
        },
        logging: {
          log_level: "INFO",
          save_results: true,
          output_path: "./backtest_results/",
        },
        reporting: {
          metrics: [
            "sharpe_ratio",
            "win_rate",
            "max_drawdown",
            "profit_factor",
          ],
          plot_styles: { theme: "default" },
        },
        exit_conditions: {
          time_exit: config.exit_conditions.exit_time,
        },
      };

      // Remove the original exit_time property
      delete fullConfig.exit_conditions.exit_time;

      // Change entry_time to time in entry_conditions
      fullConfig.entry_conditions = {
        time: config.entry_conditions.entry_time,
      };
      delete fullConfig.entry_conditions.entry_time;

      const response = await fetch(
        "https://fb6a-2405-201-a41f-e852-5c16-cb31-eb0-6151.ngrok-free.app/run_backtest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullConfig),
          // credentials: "include", // Include credentials if needed
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data, "kmjnjknh");

      setMetrics(data.metrics);
      setTrades(data.trades || []);
      setResults(data);
      setIsLoading(false);
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
