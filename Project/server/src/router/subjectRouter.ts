import { Router } from 'express'
//import { body, query } from 'express-validator'
import SubjectEndpoints from '../api/subjects/endpoints'
import SubjectController from '../controllers/subjectController'
//import StoreDataValidator from '../validators/storeDataValidator'

const subjectRouter = Router()

subjectRouter.get(
	SubjectEndpoints.GET_BY_ID,
	// StoreDataValidator.creatorId(query),
	SubjectController.getSubjectById
)

subjectRouter.post(
	SubjectEndpoints.CREATE,
	// StoreDataValidator.creatorId(body),
	// StoreDataValidator.title(body, false, { max: 50 }),
	// StoreDataValidator.StoreCompositionArrayEntries(body),
	SubjectController.createSubject
)

subjectRouter.patch(
	SubjectEndpoints.UPDATE,
	// StoreDataValidator.id(body),
	// StoreDataValidator.title(body, true, { max: 50 }),
	// StoreDataValidator.StoreCompositionArrayEntries(body),
	SubjectController.updateSubjectData
)

subjectRouter.delete(
	SubjectEndpoints.DELETE,
	// StoreDataValidator.creatorId(body),
	// StoreDataValidator.storeId(body),
	SubjectController.deleteSubject
)

export default subjectRouter