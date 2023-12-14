export interface IUpdateThemeRequest {
    theme_id : number
    question : string
    optionA : string
    optionB : string
    optionC : string
    optionD : string
    correctAnswer : string
    timeAmount : TimeRanges
}

export interface IUpdateThemeResponse {
    theme_id : number
    question : string
    optionA : string
    optionB : string
    optionC : string
    optionD : string
    correctAnswer : string
    timeAmount : TimeRanges
}