import React from "react";

export default function ProjectSection({ onNext, onBack }) {
  return (
    <div>
      <h2>Project Section</h2>
      <p>Hello World – Project Section</p>

      <div style={{ marginTop: "20px" }}>
        {onBack && <button onClick={onBack}>Back</button>}
        {onNext && <button onClick={onNext}>Next</button>}
      </div>
    </div>
  );
}
