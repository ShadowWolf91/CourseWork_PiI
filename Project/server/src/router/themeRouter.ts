import { Router } from 'express'
import ThemeEndpoints from '../api/themes/endpoints'
import ThemeController from '../controllers/themeController'

const themeRouter = Router()

themeRouter.get(
	ThemeEndpoints.GET_BY_ID,
	ThemeController.getThemeById
)

themeRouter.get(
	ThemeEndpoints.GET_ALL_THEMES,
	ThemeController.getAllThemes
)

themeRouter.post(
	ThemeEndpoints.CREATE,
	ThemeController.createTheme
)

themeRouter.patch(
	ThemeEndpoints.UPDATE,
	ThemeController.updateTheme
)

themeRouter.delete(
	ThemeEndpoints.DELETE,
	ThemeController.deleteTheme
)

export default themeRouter