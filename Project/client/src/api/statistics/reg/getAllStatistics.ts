export interface IGetAllStatisticsRequest {
  skip: number;
  take: number;
  cursor?: number;
  title?: string;
}

export interface IGetAllStatisticsResponse {
  statisticsData: {
    id_statistics: number;
    rightAnsweredTests: number;
    rightAnsweredOQs: number;
    rightAnsweredCards: number;
    markTests: number;
    markCards: number;
    markOpenQuestions: number;
    user_id: number;
    title: string;
  }[];
  cursor: number | null;
}
