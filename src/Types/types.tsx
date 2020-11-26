
export type fetchedQuestions = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type quizQuestions = {
    question: string
    answer: string,
    options: string[],
}

export interface questionProps {
    question: string,
    answer: string,
    options: string[],
    handleStep: (score:number)=>void
}

export interface result {
    totalScore: number,
    newGame: ()=>void
}