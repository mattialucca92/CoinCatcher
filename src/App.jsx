import "./App.css";
import { Routes, HashRouter, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import { useState, useEffect } from "react";

function App() {
  const [transazioni, setTransazioni] = useState(() => {
    const saved = localStorage.getItem("transazioni");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transazioni", JSON.stringify(transazioni));
  }, [transazioni]);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route
              path="dashboard"
              element={<Dashboard transazioni={transazioni} />}
            />
            <Route
              path="transactions"
              element={
                <Transaction
                  transazioni={transazioni}
                  setTransazioni={setTransazioni}
                />
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
