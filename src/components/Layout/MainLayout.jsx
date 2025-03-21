/* eslint-disable no-unused-vars */
import React from "react";
import ConfigPanel from "../ConfigPanel/ConfigPanel";
import BacktestResults from "../Results/BacktestResults";
import { useBacktest } from "../../contexts/BacktestContext";

const MainLayout = () => {
  const { results } = useBacktest();

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <ConfigPanel />
        </div>
        <div className="lg:w-2/3">
          <BacktestResults />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
