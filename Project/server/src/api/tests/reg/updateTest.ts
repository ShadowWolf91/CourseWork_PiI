export interface IUpdateTestRequest {
    id_test : number
    theme_id : number
    question : string
    optionA : string
    optionB : string
    optionC : string
    optionD : string
    correctAnswer : string
    timeAmount : Date
    testName : string
}

export interface IUpdateTestResponse {
    id_test : number
    theme_id : number
    question : string
    optionA : string
    optionB : string
    optionC : string
    optionD : string
    correctAnswer : string
    timeAmount : Date
    testName : string
}