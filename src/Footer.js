export default function Footer({questionIndex,dispatch,revealAns}) {
  return (
    <div>
      {questionIndex > 0 && (
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: "prevQuestion" });
          }}
        >
          Previous
        </button>
      )}
      {revealAns && (
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: "nextQuestion" });
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
