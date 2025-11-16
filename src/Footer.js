import Timer from "./Timer";

export default function Footer({
  questionIndex,
  dispatch,
  revealAns,
  totalQuestions,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "30px" }}>
        <button
          className="btn footer-btn"
          disabled={questionIndex === 0}
          onClick={() => {
            dispatch({ type: "prevQuestion" });
          }}
        >
          ❮
        </button>
        {questionIndex + 1 === totalQuestions ? (
          <button
            className="btn footer-btn"
            disabled={!revealAns}
            onClick={() => {
              dispatch({ type: "finish" });
            }}
          >
            Finish
          </button>
        ) : (
          <button
            className="btn footer-btn"
            disabled={!revealAns}
            onClick={() => {
              dispatch({ type: "nextQuestion" });
            }}
          >
            ❯
          </button>
        )}
      </div>

      <Timer seconds={totalQuestions * 10} setStatusFinish={dispatch} />
    </div>
  );
}
