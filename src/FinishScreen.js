export default function FinishScreen({score,totalPoints}){
    const percentage = ((score/totalPoints)*100).toFixed(0)
    return (
        <div className="result">
           <span>{emoji}</span> You Scored {score}!! ({percentage}%)
        </div>
    )
}