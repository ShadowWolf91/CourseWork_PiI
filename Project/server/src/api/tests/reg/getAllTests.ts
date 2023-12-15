export interface IGetAllTestsRequest {}

export interface IGetAllTestsResponse {
  testsData: {
    id_test: number;
    theme_id: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    testName: string;
  }[];
}
