import React from "react";

export default function LanguageSection({ onNext, onBack }) {
  return (
    <div>
      <h2>Language Section</h2>
      <p>Hello World – Language Section</p>

      <div style={{ marginTop: "20px" }}>
        {onBack && <button onClick={onBack}>Back</button>}
        {onNext && <button onClick={onNext}>Next</button>}
      </div>
    </div>
  );
}
