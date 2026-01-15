import React from "react";

export default function HobbiesSection({ onBack }) {
  return (
    <div>
      <h2>Hobbies Section</h2>
      <p>Hello World – Hobbies Section</p>

      <div style={{ marginTop: "20px" }}>
        {onBack && <button onClick={onBack}>Back</button>}
      </div>
    </div>
  );
}
