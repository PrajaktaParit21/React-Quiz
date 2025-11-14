export default function Progress({
  totalQuestions,
  score,
  totalPoints,
  questionsAnswered
}) {
  return (
    <header className="progress">
        <progress max={totalQuestions} value={questionsAnswered}/>
      <p>
        Question <strong>{questionsAnswered}</strong>/{totalQuestions}
      </p>
      <p>
        Total Points {score}/{totalPoints}
      </p>
    </header>
  );
}
