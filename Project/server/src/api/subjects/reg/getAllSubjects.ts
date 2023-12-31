export interface IGetAllSubjectsRequest {
  skip: number;
  take: number;
  cursor?: number;
  subjectName?: string;
}

export interface IGetAllSubjectsResponse {
  subjectsData: {
    id_subject: number;
    subjectName: string;
  }[];
  cursor: number | null;
}

export interface IGetSubjectsResponse {
  id_subject: number;
  subjectName: string;
}
