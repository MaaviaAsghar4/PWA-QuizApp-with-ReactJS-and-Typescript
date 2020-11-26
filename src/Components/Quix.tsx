import React, { useState } from 'react'
import '../App.css'
import {questionProps} from '../Types/types'

const Quiz: React.FC<questionProps> = ({question,answer,options,handleStep}) => {
    let [score,setScore] = useState(0)
    let setActive = (ans : string):void => {
        if (answer===ans) {
            setScore(++score)
        }
        handleStep(score);
    }

    if(typeof question === undefined) {
        return (
            <h2>Loading....</h2>
        )
    }

    return (
        <div className='quiz-container'>
            <div>
               {question && <h3> Q: { question}</h3>}
            </div>
            <div>
                <ul>
                    {options && options.map((answer:string, i:number) => {
                        return (
                        <li key={i} value={answer} onClick={()=>setActive(answer)} className='option-list'>{answer}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Quiz
