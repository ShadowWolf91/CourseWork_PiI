import { ICreateThemeRequest } from "../api/themes/reg/createTheme";
import { IDeleteThemeRequest } from "../api/themes/reg/deleteTheme";
import { IGetAllThemesRequest } from "../api/themes/reg/getAllThemes";
import {
  IGetThemeByIdRequest,
  IGetThemeByIdResponse,
} from "../api/themes/reg/getThemeById";
import {
  IGetBySubjectIdRequest,
  IGetBySubjectIdResponse,
} from "../api/themes/reg/getBySubjectId";
import { IUpdateThemeRequest } from "../api/themes/reg/updateTheme";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class ThemeService {
  //get
  static getThemeById = async ({
    id_theme,
  }: IGetThemeByIdRequest): Promise<IGetThemeByIdResponse> => {
    const theme = await prismaClient.themes.findUnique({
      where: { id_theme: +id_theme },
    });
    if (!theme)
      throw UserRequestError.NotFound(`THEME WITH ID ${id_theme} NOT FOUND`);

    return theme;
  };

  static getBySubjectId = async ({
    subject_id,
  }: IGetBySubjectIdRequest): Promise<IGetBySubjectIdResponse> => {
    const themes = await prismaClient.themes.findMany({
      where: { subject_id: +subject_id },
    });
    if (!themes)
      throw UserRequestError.NotFound(
        `THEME WITH SUBJECT_ID ${subject_id} NOT FOUND`
      );

    return {
      subject_id,
      themes,
    };
  };

  static getAllThemes = async ({
    cursor,
    themeName,
    skip,
    take,
  }: IGetAllThemesRequest) =>
    prismaClient.themes.findMany({
      skip: skip,
      take: take,
      cursor: cursor ? { id_theme: cursor } : undefined,
      where: { themeName: { contains: themeName, mode: "insensitive" } },
    });

  static getThemesForOpenQuestions = async ({}: IGetAllThemesRequest) =>
    prismaClient.themes.findMany({
      where: { mode: "OPEN_QUESTION" },
    });

  static getThemesForTests = async ({}: IGetAllThemesRequest) =>
    prismaClient.themes.findMany({
      where: { mode: "TEST" },
    });

  static getThemesForCards = async ({}: IGetAllThemesRequest) =>
    prismaClient.themes.findMany({
      where: { mode: "CARD" },
    });

  //create
  static createTheme = async ({
    subject_id,
    themeName,
    mode,
    time,
  }: ICreateThemeRequest) => {
    const theme = await prismaClient.themes.findUnique({
      where: { themeName },
      select: { id_theme: true },
    });

    if (theme)
      throw UserRequestError.BadRequest(
        `THEME WITH NAME ${themeName} ALREADY EXISTS`
      );

    return prismaClient.themes.create({
      data: {
        subject_id,
        themeName,
        mode,
        time,
      },
    });
  };

  //update
  static updateTheme = async ({
    themeId,
    subject_id,
    themeName,
    mode,
    time,
  }: IUpdateThemeRequest) => {
    const theme = await prismaClient.themes.findUnique({
      where: { id_theme: themeId },
      select: { id_theme: true },
    });
    if (!theme)
      throw UserRequestError.NotFound(`THEME WITH NAME ${themeId} NOT FOUND`);

    return prismaClient.themes.update({
      where: { id_theme: themeId },
      data: {
        subject_id,
        themeName,
        mode,
        time,
      },
    });
  };

  //delete
  static deleteTheme = async ({ themeId }: IDeleteThemeRequest) => {
    // const theme = await prismaClient.themes.findMany({
    //   where: { id_theme: { in: themeId } },
    //   select: { id_theme: true },
    // });

    // if (!theme)
    //   throw UserRequestError.NotFound(`THEME WITH ID ${themeId} NOT FOUND`);

    return prismaClient.themes.deleteMany({
      where: { id_theme: { in: themeId } },
    });
  };
}
