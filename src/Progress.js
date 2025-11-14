export default function Progress({
  totalQuestions,
  questionIndex,
  score,
  totalPoints,
}) {
  return (
    <header className="progress">
        <progress max={totalQuestions} value={questionIndex+1}/>
      <p>
        Question <strog>{questionIndex+1}</strog>/{totalQuestions}
      </p>
      <p>
        Total Points {score}/{totalPoints}
      </p>
    </header>
  );
}
