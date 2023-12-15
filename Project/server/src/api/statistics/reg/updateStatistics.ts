export interface IUpdateStatisticRequest {
  id_statistics: number;
  rightAnswered: number;
  score: number;
  mark: number;
  user_id: number;
  test_id: number;
  openQuestion_id: number;
  card_id: number;
}

export interface IUpdateStatisticResponse {
  id_statistics: number;
  rightAnswered: number;
  score: number;
  mark: number;
  user_id: number;
  test_id: number;
  openQuestion_id: number;
  card_id: number;
}
