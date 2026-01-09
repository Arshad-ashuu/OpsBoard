import { useState } from "react";
import Summary from "./components/Summary";
import ServicesTable from "./components/ServicesTable";
import RegisterService from "./components/RegisterService";
import "./styles.css";
import AlertEmails from "./components/AlertEmails";
export default function App() {
  const [refreshTick, setRefreshTick] = useState(0);

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <span className="dot live" />
          <h1>OpsBoard</h1>
        </div>
        <button className="ghost" onClick={() => setRefreshTick(t => t + 1)}>
          ⟳ Refresh
        </button>
 
   
      
      </header>
        <AlertEmails />
      {/* 🔥 REGISTER FORM (BACK) */}
      <RegisterService onRegistered={() => setRefreshTick(t => t + 1)} />


      {/* 🔥 KPI CARDS */}
      <Summary refreshTick={refreshTick} />



      {/* 🔥 SERVICES TABLE */}
      <ServicesTable refreshTick={refreshTick} />
    </div>
  );
}
