import { useEffect, useState } from "react";
import API from "../api";


const ago = d => {
  if (!d) return "-";
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  return `${Math.floor(s/3600)}h ago`;
};

export default function ServicesTable({ refreshTick }) {
  const [services, setServices] = useState([]);
  const [env, setEnv] = useState("");

  const load = () => {
    const url = env ? `/dashboard/services?env=${env}` : `/dashboard/services`;
    API.get(url).then(res => setServices(Array.isArray(res.data) ? res.data : []));
  };

  useEffect(() => {
    load();
    const i = setInterval(load, 50000);
    return () => clearInterval(i);
  }, [env, refreshTick]);

  return (
    <div className="card">
      <div className="header">
        <h3>Services</h3>
        <select onChange={e => setEnv(e.target.value)}>
          <option value="">All</option>
          <option value="prod">Prod</option>
          <option value="staging">Staging</option>
          <option value="dev">Dev</option>
        </select>
      </div>

      {services.length === 0 ? (
        <div className="empty">No services registered</div>
      ) : (
        <table className="table">


          <thead>
            <tr>
              <th>Name</th><th>Env</th><th>Health</th><th>Failures</th><th>Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id} className={s.failureCount >= 5 ? "sev" : ""}>
                <td title={s.url} className="mono">{s.name}</td>
                <td>{s.environment}</td>
                <td>
                  <span className={`badge ${s.status === "UP" ? "badge-up" : "badge-down"}`}>
                    {s.status}
                  </span>
                </td>
                <td>{s.failureCount}</td>
                <td>{ago(s.lastCheckedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
