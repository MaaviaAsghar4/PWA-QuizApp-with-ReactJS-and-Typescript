import React, { useEffect, useState } from 'react'
import { getQuestions } from './../Service/QuizApi'
import '../App.css'
import Quiz from './Quix'
import Result from './Result'
import { quizQuestions } from '../Types/types'

const Header: React.FC = () => {
    const [difficultyLevel, setDifficultyLevel] = useState('')
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [nextQuestion, setNextQuestion] = useState(0)
    const [quizQues, setQuizQuestions] = useState<quizQuestions[]>([])
    let [count, setCount] = useState(false)
    let [showResult, setResult] = useState(false)
    let [total, setTotal] = useState(0)

    let handleQuestions = (e: any) => {
        setTotalQuestions(e.target.value)
    }

    let handleDifficulty = (e: any) => {
        setDifficultyLevel(e.target.value)
    }

    const fetchQuiz = () => {
        setCount(true)
    }

    let handleStep = (score: number) => {
        if (nextQuestion !== quizQues.length - 1) {
            setNextQuestion(prev => prev + 1)
        } else if (nextQuestion === quizQues.length - 1) {
            setTotal(score)
            setResult(true)
        }
    }

    let handleNewGame = () => {
        setResult(false)
        setCount(false)
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            const quizQues: quizQuestions[] = await getQuestions(totalQuestions, difficultyLevel);
            setQuizQuestions(quizQues)
        }
        fetchQuestions()
    }, [totalQuestions, difficultyLevel, count])

    if (showResult) {
        return (
            <Result
                totalScore={total}
                newGame={handleNewGame}
            />
        )
    }

    if (count) {
        return (
            <Quiz
                question={quizQues[nextQuestion].question}
                answer={quizQues[nextQuestion].answer}
                options={quizQues[nextQuestion].options}
                handleStep={handleStep}
            />
        )
    }
    return (
        <div className='quiz-container'>
            <h1 className='title'>Quiz Application</h1>
            <div className='box'>
                <h2>Test Yourself</h2>
                <div className='difficulty-select'>
                    <label htmlFor='difficulty-level'>Select a dificult level</label>
                    <select name='difficulty-level' required={true} onChange={handleDifficulty}>
                        <option value=''>Select difficulty</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
                <div className='question-select'>
                    <label htmlFor='questions'>Select number of Questions</label>
                    <select name='questions' required={true} onChange={handleQuestions}>
                        <option value=''>Select total</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div>
                    <button onClick={fetchQuiz} className='play'>Play</button>
                </div>
            </div>
        </div>
    )
}

export default Header
