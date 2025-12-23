export default function AdvanceTemplate({ data }) {
  return (
    <div className="preview advance">
      <h1>{data.bio?.name}</h1>

      <h3>Skills</h3>
      <ul>
        {data.skill.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
