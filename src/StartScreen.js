export default function StartScreen({ questionCount, dispatch }) {
  return (
    <div className="start card">
      <span style={{ fontSize: "5.5rem", animation: "pulse 1.8s infinite" }}>
        ✨
      </span>

      <h2>Welcome to the React Quiz!</h2>
      <h3>
        Ready to challenge your <strong>React skills</strong>? <br />
        <span style={{ color: "var(--color-accent)" }}>
          {questionCount} questions await 🔥
        </span>
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
        style={{ marginTop: "2rem" }}
      >
        Begin the Challenge 🚀
      </button>
    </div>
  );
}
