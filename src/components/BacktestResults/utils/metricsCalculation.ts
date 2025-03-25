export const calculateAdvancedMetrics = (trades) => {
  const totalTrades = trades.length;
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const winningTrades = trades.filter((trade) => trade.profit > 0);
  const losingTrades = trades.filter((trade) => trade.profit <= 0);

  const profitByPriceMovement = trades.map((trade) => ({
    priceChange: trade.exit_underlying_price - trade.entry_underlying_price,
    profit: trade.profit,
  }));

  const legTypePerformance = trades.reduce((acc, trade) => {
    trade.legs.forEach((leg) => {
      if (!acc[leg.leg_type]) {
        acc[leg.leg_type] = {
          totalPnl: 0,
          trades: 0,
          avgPnl: 0,
        };
      }
      acc[leg.leg_type].totalPnl += leg.pnl;
      acc[leg.leg_type].trades++;
    });

    Object.keys(acc).forEach((key) => {
      acc[key].avgPnl = acc[key].totalPnl / acc[key].trades;
    });

    return acc;
  }, {});

  const tradeDurations = trades.map((trade) => {
    const duration =
      new Date(trade.exit_date).getTime() -
      new Date(trade.entry_date).getTime();
    return {
      durationHours: duration / (1000 * 60 * 60),
      profit: trade.profit,
    };
  });

  const strikeImpactData = trades.map((trade) => {
    const avgStrike =
      trade.legs.reduce((sum, leg) => sum + leg.strike, 0) / trade.legs.length;
    return {
      avgStrike,
      profit: trade.profit,
    };
  });

  return {
    totalTrades,
    totalProfit,
    winningTradesCount: winningTrades.length,
    losingTradesCount: losingTrades.length,
    winRate: winningTrades.length / totalTrades,
    profitByPriceMovement,
    legTypePerformance,
    tradeDurations,
    strikeImpactData,
  };
};

// src/components/BacktestResults/charts/ProfitLineChart.tsx
