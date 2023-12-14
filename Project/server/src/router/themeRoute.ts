import { Router } from 'express'
//import { body, query } from 'express-validator'
import ThemeEndpoints from '../api/themes/endpoints'
import ThemeController from '../controllers/themeController'
//import StoreDataValidator from '../validators/storeDataValidator'

const themeRouter = Router()

themeRouter.get(
	ThemeEndpoints.GET_BY_ID,
	// StoreDataValidator.creatorId(query),
	ThemeController.getThemeById
)

themeRouter.post(
	ThemeEndpoints.CREATE,
	// StoreDataValidator.creatorId(body),
	// StoreDataValidator.title(body, false, { max: 50 }),
	// StoreDataValidator.StoreCompositionArrayEntries(body),
	ThemeController.createTheme
)

themeRouter.patch(
	ThemeEndpoints.UPDATE,
	// StoreDataValidator.id(body),
	// StoreDataValidator.title(body, true, { max: 50 }),
	// StoreDataValidator.StoreCompositionArrayEntries(body),
	ThemeController.updateTheme
)

themeRouter.delete(
	ThemeEndpoints.DELETE,
	// StoreDataValidator.creatorId(body),
	// StoreDataValidator.storeId(body),
	ThemeController.deleteTheme
)

export default themeRouter