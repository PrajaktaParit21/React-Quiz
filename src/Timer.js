import { useEffect, useReducer, useState } from "react";
export default function Timer({ setStatusFinish, seconds }) {
  function reducer(state, action) {
    switch (action.type) {
      case "dec":
        return {
          ...state,
          min: state.sec - 1 === -1 ? state.min - 1 : state.min,
          sec: state.sec - 1 ===-1? 59 : state.sec -1,
        };
      default:
        return { ...initialState };
    }
  }
  const initialState = { sec: seconds%60, min: Math.floor(seconds/60) };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sec, min } = state;
  useEffect(() => {
    const id = setInterval(() => {
      console.log("in interval");
      
      if (min === 0 && sec === 1) {
        setStatusFinish({type:"finish"});
      }
      else dispatch({ type: "dec", payload: 1 });
    }, 1000);

    return ()=> clearInterval(id)
  }, [min,sec,setStatusFinish]);

  return (
    <div className="timer">
      <span>Time left</span>
      <span>{min > 9 ? min : "0" + min}</span>:
      <span>{sec > 9 ? sec : "0" + sec}</span>
    </div>
  );
}
