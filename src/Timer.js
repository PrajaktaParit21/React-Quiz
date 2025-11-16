import { useEffect, useReducer } from "react";
export default function Timer({ setStatusFinish, seconds }) {
  function reducer(state, action) {
    switch (action.type) {
      case "dec":
        const total = state.min * 60 + state.sec - 1;
        return {
          ...state,
          min: Math.floor(total / 60),
          sec: total % 60,
        };
      default:
        return { ...initialState };
    }
  }
  const initialState = { sec: seconds % 60, min: Math.floor(seconds / 60) };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sec, min } = state;
  useEffect(() => {
    const id = setInterval(() => {
      console.log("in interval");

      if (min === 0 && sec === 1) {
        setStatusFinish({ type: "finish" });
      } else dispatch({ type: "dec", payload: 1 });
    }, 1000);

    return () => clearInterval(id);
  }, [min, sec, setStatusFinish]);

  return (
    <div className="timer">
      <span>⏳ Time Left</span>
      <div>
        {min > 9 ? min : "0" + min}:{sec > 9 ? sec : "0" + sec}
      </div>
    </div>
  );
}
