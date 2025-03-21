import React from "react";
import "./App.css";
import { BacktestProvider } from "./contexts/BacktestContext";
import Header from "./components/Layout/Header";
import MainLayout from "./components/Layout/MainLayout";

function App() {
  return (
    <BacktestProvider>
      <div className="app-background">
        <Header />
        <MainLayout />
      </div>
    </BacktestProvider>
  );
}

export default App;
