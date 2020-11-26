import {fetchedQuestions, quizQuestions} from '../Types/types'

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

export const getQuestions = async (totalQuestions: number, level: string) : Promise<quizQuestions[]> => {
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`)

    const { results }  = await fetchQuestions.json()
    const quizQuestions : quizQuestions[] = results.map((questionObj: fetchedQuestions) => {
        const answerArray = [...questionObj.incorrect_answers, questionObj.correct_answer]
        return {
            question: questionObj.question,
            answer: questionObj.correct_answer,
            options: shuffleArray(answerArray)
        }
    })
    return quizQuestions
}