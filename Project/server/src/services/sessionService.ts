import { ICreateSessionRequest } from "../api/sessions/reg/createSession";
import prismaClient from "../prismaClient";

export default class SessionService {
  //create
  static createSession = async ({ userId, themeId }: ICreateSessionRequest) => {
    const stat = await prismaClient.statistics.create({});
    return prismaClient.tOCSession.create({
      data: {
        userId: +userId,
        themeId: +themeId,
        statisticId: stat.id,
      },
    });
  };
}
