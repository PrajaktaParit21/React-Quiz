export default function Question({questionIndex,questionObj,dispatch,revealAns}){
    
    const {question,options,correctOption,points} = questionObj
    
    return (
        <div>
        <h4>{questionIndex+1}.  {question}</h4>
        <div className="options">
            
        {options.map((option,index) => (
            <button disabled={revealAns} className={`btn btn-option ${revealAns? index===correctOption? "correct answer": "wrong" : ""}`} key={"option"+index} onClick={()=>{dispatch({type:'answerChosen',payLoad:index===correctOption?points:0})}}>{option}</button>
        ))}
        </div>
        </div>
    )
}
