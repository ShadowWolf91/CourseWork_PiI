export interface IUpdateOpenQuestionRequest {
    id_openQustion : number
    theme_id : number
    question : string
    correctAnswer : string
    timeAmount : Date
    openQuestionName : string
}

export interface IUpdateOpenQuestionResponse {
    id_openQustion : number
    theme_id : number
    question : string
    correctAnswer : string
    timeAmount : Date
    openQuestionName : string
}