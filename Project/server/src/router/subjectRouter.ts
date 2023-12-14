import { Router } from 'express'
import SubjectEndpoints from '../api/subjects/endpoints'
import SubjectController from '../controllers/subjectController'

const subjectRouter = Router()

subjectRouter.get(
	SubjectEndpoints.GET_BY_ID,
	SubjectController.getSubjectBySubId
)

subjectRouter.get(
	SubjectEndpoints.GET_ALL_SUBJECTS,
	SubjectController.getAllSubjects
)

subjectRouter.post(
	SubjectEndpoints.CREATE,
	SubjectController.createSubject
)

subjectRouter.patch(
	SubjectEndpoints.UPDATE,
	SubjectController.updateSubjectData
)

subjectRouter.delete(
	SubjectEndpoints.DELETE,
	SubjectController.deleteSubject
)

export default subjectRouter