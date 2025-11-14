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

const initialState = {
  questions: [],
  status: "loading",
  questionIndex: 0,
  revealAns: false,
  score: 0,
  totalPoints: 0,
  questionsAnswered: 0,
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
    default:
      throw new Error("Unknown action type");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, questionIndex, revealAns, score, totalPoints } =
    state;
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
            <Progress totalQuestions={questions.length} questionIndex={questionIndex} score={score} totalPoints={totalPoints} />
            <Question
              questionIndex={questionIndex}
              questionObj={questions[questionIndex]}
              dispatch={dispatch}
              revealAns={revealAns}
            />
            <Footer
              questionIndex={questionIndex}
              dispatch={dispatch}
              revealAns={revealAns}
            />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
