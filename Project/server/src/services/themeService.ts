import { ICreateThemeRequest } from '../api/themes/reg/createTheme'
import { IDeleteThemeRequest } from '../api/themes/reg/deleteTheme'
import {
	IGetThemeByIdRequest,
	IGetThemeByIdResponse,
} from '../api/themes/reg/getThemeById'
import { IUpdateThemeRequest } from '../api/themes/reg/updateTheme'
import UserRequestError from '../errors/userRequestError'
import prismaClient from '../prismaClient'

export default class ThemeService {
	//get
	static getThemeById = async ({
        id_theme,
	}: IGetThemeByIdRequest): Promise<IGetThemeByIdResponse> => {
		const theme = await prismaClient.themes.findUnique({
			where: { id_theme },
		})
		if (!theme)
			throw UserRequestError.NotFound(
				`THEME WITH ID ${id_theme} NOT FOUND`
			)

		return {
			...theme,
		}
	}

	//create
	static createTheme = async ({
		id_theme,
        subject_id,
		themeName,
	}: ICreateThemeRequest) => {
		const theme = await prismaClient.themes.findUnique({
			where: { id_theme },
			select: { id_theme: true },
		})

		if (theme)
			throw UserRequestError.BadRequest(
				`THEME WITH ID ${id_theme} ALREADY EXISTS`
			)

		return prismaClient.themes.create({
			data: {
				id_theme,
                subject_id,
				themeName,
			},
		})
	}

	//update
	static updateTheme = async ({
		id_theme,
		subject_id,
		themeName,
	}: IUpdateThemeRequest) => {
		const theme = await prismaClient.themes.findUnique({
			where: { id_theme },
			select: { id_theme: true },
		})
		if (!theme)
			throw UserRequestError.NotFound(`STORE WITH ID ${id_theme} NOT FOUND`)

		return prismaClient.themes.update({
			where: { id_theme },
			data: {
				subject_id,
				themeName,
			},
		})
	}

	//delete
	static deleteTheme = async ({ id_theme, subject_id }: IDeleteThemeRequest) => {
		const theme = await prismaClient.themes.findUnique({
			where: { id_theme: id_theme },
			select: { id_theme: true },
		})

		if (!theme)
			throw UserRequestError.NotFound(
				`STORE WITH ID ${id_theme} AND SUBJECT ID ${subject_id} NOT FOUND`
			)

		return prismaClient.themes.delete({
			where: { id_theme: id_theme },
		})
	}
}