export interface ICreateTestRequest {
  theme_id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  timeAmount: Date;
  testName: string;
}

export interface ICreateTestResponse {
  id_test: number;
  theme_id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  timeAmount: Date;
  testName: string;
}
