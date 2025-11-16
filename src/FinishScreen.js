export default function FinishScreen({
  score,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = ((score / totalPoints) * 100).toFixed(0);
  return (
    <div>
      <div className="finish-card">
        <h2>
          Quiz Complete!
          <span style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</span>
        </h2>

        <div className="result">
          You scored <span className="score">{score}</span> ({percentage}%)
        </div>

        <div className="highscore">
          High score: <span className="score">{highScore}</span>
        </div>

        <button
          className="btn btn-ui restart-btn"
          onClick={() => dispatch({ type: "reset" })}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
