import { useEffect, useState } from "react";
import API from "../api";
import UptimeMiniChart from "./UptimeMiniChart";

export default function Summary({ refreshTick }) {
  const [stats, setStats] = useState(null);

  const load = () => {
    API.get("/dashboard/services").then(res => {
      const s = Array.isArray(res.data) ? res.data : [];
      const up = s.filter(x => x.status === "UP").length;
      const down = s.filter(x => x.status === "DOWN").length;

      setStats({
        total: s.length,
        up,
        down,
      });
    });
  };

  useEffect(() => {
    load();
    const i = setInterval(load, 30000);
    return () => clearInterval(i);
  }, [refreshTick]);

  if (!stats) return null;

  return (
    <div className="summary-wrapper">
      {/* KPI CARDS */}
      <div className="kpis compact">
        <div className="kpi ok">
          <span className="kpi-title">TOTAL</span>
          <span className="kpi-value"> {stats.total}</span>
        </div>
        <div className="kpi up">
          <span className="kpi-title">UP</span>
          <span className="kpi-value"> {stats.up}</span>
        </div>
        <div className="kpi down">
          <span className="kpi-title">DOWN</span>
          <span className="kpi-value"> {stats.down}</span>
        </div>
      </div>

      {/* 🔥 OVERALL UPTIME */}
      <div className="summary-uptime">
        <span className="label">Overall Uptime</span>
        <UptimeMiniChart up={stats.up} down={stats.down} />
      </div>
    </div>
  );
}
