export default function FinishScreen({
  score,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = ((score / totalPoints) * 100).toFixed(0);
  return (
    <>
      <div className="result">
        You Scored {score}!! ({percentage}%)
      </div>
      
      <div className="highscore">Your highScore is {highScore}</div>

      <div style={{ display: "flex", justifyContent: "center", width:"100%" }}>
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: "reset" });
          }}
        >
          Restart
        </button>
      </div>
    </>
  );
}
