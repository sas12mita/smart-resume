export default function BasicTemplate({ data }) {
  return (
    <div className="preview basic">
      <h2>{data.bio?.name || "Your Name"}</h2>
      <p>{data.bio?.email}</p>

      <h3>Education</h3>
      {data.education.map((e, i) => (
        <p key={i}>{e.degree} – {e.institute}</p>
      ))}
    </div>
  );
}
