import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import { RequireAuth } from '../components/RequireAuth/RequireAuth.tsx'
import { UsersPage } from '../pages/adminPanel/userPage/UsersPage.tsx'
import { SubjectsPage } from '../pages/adminPanel/subjectPage/SubjectPage.tsx'
import { ThemesPage } from '../pages/teacherPanel/themePage/ThemePage.tsx'
import { TestsPage } from '../pages/teacherPanel/testPage/TestPage.tsx'
import { OpenQuestionsPage } from '../pages/teacherPanel/openQuestionPage/OpenQuestionPage.tsx'
import { CardsPage } from '../pages/teacherPanel/cardPage/CardPage.tsx'
import { StatsPage } from '../pages/teacherPanel/statPage/StatPage.tsx'
import { UserSubjectsPage } from '../pages/userPanel/subjectPage/SubjectPage.tsx'
import { UserThemePage } from '../pages/userPanel/themePage/ThemePage.tsx'
import { UserCardCreatePage } from '../pages/userPanel/CardCreatePage/CardCreatePage.tsx'
import { UserTestCreatePage } from '../pages/userPanel/TestCreatePage/TestCreatePage.tsx'
import { AuthPage } from '../pages/AuthPage/auth.tsx'
import { UserTOCPage } from '../pages/userPanel/TOCPage/TOCPage.tsx'
//import { StatsUserPage } from '../pages/userPanel/statPage/StatPage.tsx'

export const browserRouter = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'admin/users/',
				element: (
					<RequireAuth isRootRequire>
						<UsersPage />
					</RequireAuth>
				),
			},
			{
				path: 'admin/subjects/',
				element: (
					<RequireAuth isRootRequire>
						<SubjectsPage />
					</RequireAuth>
				),
			},
			{
				path: 'teacher/themes/',
				element: (
					<RequireAuth isRootRequire>
						<ThemesPage />
					</RequireAuth>
				),
			},
			{
				path: 'teacher/tests/',
				element: (
					<RequireAuth isRootRequire>
						<TestsPage />
					</RequireAuth>
				),
			},
			{
				path: 'teacher/openQuestions/',
				element: (
					<RequireAuth isRootRequire>
						<OpenQuestionsPage />
					</RequireAuth>
				),
			},
			{
				path: 'teacher/cards/',
				element: (
					<RequireAuth isRootRequire>
						<CardsPage />
					</RequireAuth>
				),
			},
			{
				path: 'teacher/stats/',
				element: (
					<RequireAuth isRootRequire>
						<StatsPage />
					</RequireAuth>
				),
			},
			{
				path: 'user/subjects/',
				element: (
					<RequireAuth>
						<UserSubjectsPage />
					</RequireAuth>
				),
			},
			{
				path: 'user/subjects/:subject_id',
				element: (
					<RequireAuth>
						<UserThemePage />
					</RequireAuth>
				),
			},
			{
				path: 'user/subjects/:themeName/:theme_id',
				element: (
					<RequireAuth>
						<UserTOCPage />
					</RequireAuth>
				),
			},
			{
				path: 'user/card/',
				element: (
					<RequireAuth>
						<UserCardCreatePage />
					</RequireAuth>
				),
			},
			{
				path: 'user/test/',
				element: (
					<RequireAuth>
						<UserTestCreatePage />
					</RequireAuth>
				),
			},
			// {
			// 	path: 'user/stats/',
			// 	element: (
			// 		<RequireAuth>
			// 			<StatsUserPage />
			// 		</RequireAuth>
			// 	),
			// },
		],
	},
	{ path: 'auth', element: <AuthPage /> },
])
