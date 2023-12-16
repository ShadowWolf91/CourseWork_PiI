import { ICreateSubjectRequest } from "../api/subjects/reg/createSubject";
import { IDeleteSubjectRequest } from "../api/subjects/reg/deleteSubject";
import { IUpdateSubjectRequest } from "../api/subjects/reg/updateSubject";
import { IGetAllSubjectsRequest } from "../api/subjects/reg/getAllSubjects";
import { IGetSubjectBySubIdRequest } from "../api/subjects/reg/getSubjectBySubId";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class SubjectService {
  //get
  static getSubjectBySubId = async ({
    id_subject,
  }: IGetSubjectBySubIdRequest) =>
    prismaClient.subjects.findUnique({
      where: { id_subject: +id_subject },
    });

  static getAllSubjects = async ({
    cursor,
    subjectName,
    skip,
    take,
  }: IGetAllSubjectsRequest) =>
    prismaClient.subjects.findMany({
      skip,
      take,
      cursor: cursor ? { id_subject: cursor } : undefined,
      where: { subjectName: { contains: subjectName, mode: "insensitive" } },
    });

  //create
  static createSubject = async ({ subjectName }: ICreateSubjectRequest) => {
    const subject = await prismaClient.subjects.findUnique({
      where: { subjectName },
      select: { id_subject: true },
    });

    if (subject)
      throw UserRequestError.NotFound(
        `SUBJECT WITH NAME ${subjectName} NOT CREATED`
      );

    return prismaClient.subjects.create({
      data: {
        subjectName,
      },
    });
  };

  //update
  static updateSubject = async ({
    id_subject,
    subjectName,
  }: IUpdateSubjectRequest) => {
    const subject = await prismaClient.subjects.findUnique({
      where: { id_subject },
      select: { id_subject: true },
    });
    if (!subject)
      throw UserRequestError.NotFound(
        `SUBJECT WITH ID ${id_subject} NOT FOUND`
      );

    return prismaClient.subjects.update({
      where: { id_subject },
      data: {
        subjectName,
      },
    });
  };

  //delete
  static deleteSubject = async ({ id_subject }: IDeleteSubjectRequest) => {
    const subject = await prismaClient.subjects.findUnique({
      where: { id_subject: id_subject },
      select: { id_subject: true },
    });

    if (!subject)
      throw UserRequestError.NotFound(
        `SUBJECT WITH ID ${id_subject} NOT FOUND`
      );

    return prismaClient.subjects.delete({
      where: { id_subject: id_subject },
    });
  };
}
