import Timer from "./Timer";

export default function Footer({
  questionIndex,
  dispatch,
  revealAns,
  totalQuestions,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {questionIndex > 0 && (
      <div style={{ display: "flex", gap: "30px" }}>
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: "prevQuestion" });
          }}
        >
          Previous
        </button>
      )}
      {revealAns? questionIndex + 1 === totalQuestions ? (
        <button className="btn" onClick={()=>{dispatch({type:'finish'})}}>Finish</button>
      ) : (
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
        >
          Next
        </button>
      ): null}
      </div>

      <Timer seconds={totalQuestions * 10} setStatusFinish={dispatch} />
    </div>
  );
}
