import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api";
import "./Reflection.css";

function Reflection() {
  const [reflections, setReflections] = useState([]);
  const [newReflection, setNewReflection] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;
    fetch(`${API_BASE_URL}/api/reflections/user/${username}`)
      .then(res => res.json())
      .then(data => setReflections(data))
      .catch(err => console.error("Error fetching reflections:", err));
  }, [username]);

  const addReflection = () => {
    if (!newReflection.trim()) return;
    fetch(`${API_BASE_URL}/api/reflections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: newReflection,
        user: { username }
      })
    })
      .then(res => res.json())
      .then(data => setReflections([data, ...reflections]))
      .catch(err => console.error("Error adding reflection:", err));

    setNewReflection("");
  };

  const deleteReflection = (id) => {
    fetch(`${API_BASE_URL}/api/reflections/${id}`, { method: "DELETE" })
      .then(() => setReflections(reflections.filter(r => r.id !== id)))
      .catch(err => console.error("Error deleting reflection:", err));
  };

  return (
    <div className="reflection-page">
      <h2>My Reflections</h2>

      <div className="reflection-form">
        <h3>Add a New Reflection</h3>
        <textarea
          placeholder="Write your thoughts..."
          value={newReflection}
          onChange={(e) => setNewReflection(e.target.value)}
        />
        <button onClick={addReflection}>Add Reflection</button>
      </div>

      <div className="reflection-list">
        {reflections.length === 0 ? (
          <p className="empty-message">No reflections yet. Start writing!</p>
        ) : (
          reflections.map(r => (
            <div className="reflection-card" key={r.id}>
              <p className="reflection-message">{r.message}</p>
              <p className="reflection-date">
                {r.date?.split("T")[0]}
              </p>
              <button
                className="delete-btn"
                onClick={() => deleteReflection(r.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reflection;
