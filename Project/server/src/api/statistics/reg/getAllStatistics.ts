export interface IGetAllStatisticsRequest {
  skip: number;
  take: number;
  cursor?: number;
  title?: string;
}

export interface IGetAllStatisticsResponse {
  statisticsData: {
    id: number;
    rightAnswered: number;
    mark: number;
  }[];
  cursor: number | null;
}
