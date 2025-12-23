export default function ModernTemplate({ data }) {
  return (
    <div className="preview modern">
      <h1>{data.bio?.name || "Your Name"}</h1>

      <section>
        <h4>Experience</h4>
        {data.experience.map((e, i) => (
          <div key={i}>
            <strong>{e.title}</strong>
            <p>{e.company}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
