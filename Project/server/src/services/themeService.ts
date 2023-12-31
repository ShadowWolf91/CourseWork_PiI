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

    return {
      ...theme,
    };
  };

  static getBySubjectId = async ({
    subject_id,
  }: IGetBySubjectIdRequest): Promise<IGetBySubjectIdResponse> => {
    const theme = await prismaClient.themes.findMany({
      select: {
        themeName: true,
      },
      where: { subject_id: +subject_id },
    });
    if (!theme)
      throw UserRequestError.NotFound(
        `THEME WITH SUBJECT_ID ${subject_id} NOT FOUND`
      );

    return {
      subject_id,
      themeName: theme.map((t) => t.themeName),
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

  //create
  static createTheme = async ({
    subject_id,
    themeName,
    mode,
    questionAmount,
    time,
  }: ICreateThemeRequest) => {
    const theme = await prismaClient.themes.findUnique({
      where: { themeName },
      select: { id_theme: true },
    });

    if (theme)
      throw UserRequestError.BadRequest(
        `THEME WITH ID ${themeName} ALREADY EXISTS`
      );

    return prismaClient.themes.create({
      data: {
        subject_id,
        themeName,
        mode,
        questionAmount,
        time,
      },
    });
  };

  //update
  static updateTheme = async ({
    id_theme,
    subject_id,
    themeName,
    mode,
    questionAmount,
    time,
  }: IUpdateThemeRequest) => {
    const theme = await prismaClient.themes.findUnique({
      where: { id_theme },
      select: { id_theme: true },
    });
    if (!theme)
      throw UserRequestError.NotFound(`STORE WITH ID ${id_theme} NOT FOUND`);

    return prismaClient.themes.update({
      where: { id_theme },
      data: {
        subject_id,
        themeName,
        mode,
        questionAmount,
        time,
      },
    });
  };

  //delete
  static deleteTheme = async ({ id_theme }: IDeleteThemeRequest) => {
    const theme = await prismaClient.themes.findUnique({
      where: { id_theme: id_theme },
      select: { id_theme: true },
    });

    if (!theme)
      throw UserRequestError.NotFound(`THEME WITH ID ${id_theme} NOT FOUND`);

    return prismaClient.themes.delete({
      where: { id_theme: id_theme },
    });
  };
}
