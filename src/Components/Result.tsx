import React from 'react'
import '../App.css'
import {result} from '../Types/types'

const Result:React.FC<result> = ({totalScore,newGame}) => {
    return (
        <div className='quiz-container'>
            <h3>Your Total Score is <strong>{totalScore}</strong></h3>
            <button className='next' onClick={newGame}>Play Again</button>
        </div>
    )
}

export default Result
