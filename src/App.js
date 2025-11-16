import "./index.css";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Footer from "./Footer";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  questionIndex: 0,
  revealAns: false,
  score: 0,
  totalPoints: 0,
  questionsAnswered: 0,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const totalPoints = action.payLoad.reduce(
        (currSum, currVal) => currSum + +currVal.points,
        0
      );
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
        totalPoints,
      };
    case "dataFailed":
      return {
        ...state,
        questions: [],
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answerChosen":
      return {
        ...state,
        revealAns: true,
        score: state.score + +action.payLoad,
        questionsAnswered: state.questionsAnswered + 1,
      };

    case "nextQuestion":
      return {
        ...state,
        revealAns: state.questionIndex + 1 < state.questionsAnswered, //reveal the answer only if is answered already
        questionIndex: state.questionIndex + 1,
      };
    case "prevQuestion":
      return {
        ...state,
        revealAns: true,
        questionIndex: state.questionIndex - 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.score),
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
        totalPoints: state.totalPoints,
        highScore: state.highScore,
      };
    default:
      throw new Error("Unknown action type");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    questionIndex,
    revealAns,
    score,
    totalPoints,
    questionsAnswered,
    highScore,
  } = state;
  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("http://localhost:9000/questions");

      try {
        const data = await res.json();
        dispatch({ type: "dataReceived", payLoad: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionCount={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalQuestions={questions.length}
              questionsAnswered={questionsAnswered}
              score={score}
              totalPoints={totalPoints}
            />
            <Question
              questionIndex={questionIndex}
              questionObj={questions[questionIndex]}
              dispatch={dispatch}
              revealAns={revealAns}
            />
            <Timer seconds={questions.length * 10} setStatusFinish={dispatch}/>
            <Footer
              questionIndex={questionIndex}
              dispatch={dispatch}
              revealAns={revealAns}
              totalQuestions={questions.length}
            />
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            score={score}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
