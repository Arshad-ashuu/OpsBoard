import { useState } from "react";
import API from "../api";

export default function RegisterService({ onRegistered }) {
  const [form, setForm] = useState({
    name: "",
    environment: "prod",
    url: "",
  });

  const submit = async () => {
    if (!form.name || !form.url) {
      alert("Name & URL required");
      return;
    }

    await API.post("/services/register", form);
    setForm({ name: "", environment: "prod", url: "" });
    onRegistered?.();
  };

  return (
    <div className="card register">
      <h3>Register Service</h3>

      <div className="row">
        <input
          placeholder="Service Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Service URL"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
        />
        <select
          value={form.environment}
          onChange={e => setForm({ ...form, environment: e.target.value })}
        >
          <option value="prod">Prod</option>
          <option value="staging">Staging</option>
          <option value="dev">Dev</option>
        </select>

        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}
