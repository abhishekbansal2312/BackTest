import React from "react";
import "./App.css";
import { BacktestProvider } from "./contexts/BacktestContext";
import Header from "./components/Layout/Header";
import MainLayout from "./components/Layout/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <BacktestProvider>
        <div className="app-background">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<MainLayout />} />
          </Routes>
          <Footer />
        </div>
      </BacktestProvider>
    </BrowserRouter>
  );
}

export default App;
