import { useEffect, useState } from "react";
import API from "../api";

export default function AlertEmails() {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");

  const load = () =>
    API.get("/alerts/emails").then(res => setEmails(res.data));

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!email) return;
    await API.post("/alerts/emails", { email });
    setEmail("");
    load();
  };

  const remove = async (id) => {
    await API.delete(`/alerts/emails/${id}`);
    load();
  };

  return (
    <div className="card">
      <h3>Alert Emails</h3>

      <div className="row">
        <input
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>

      {emails.map(e => (
        <div key={e.id} className="email-row">
          {e.email}
          <button className="ghost" onClick={() => remove(e.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}


