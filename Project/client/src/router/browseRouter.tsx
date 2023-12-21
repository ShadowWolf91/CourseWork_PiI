import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import { RequireAuth } from '../components/RequireAuth/RequireAuth.tsx'
import { UsersPage } from '../pages/adminPanel/userPage/UsersPage.tsx'
import { SubjectsPage } from '../pages/adminPanel/subjectPage/SubjectPage.tsx'
import { ThemesPage } from '../pages/adminPanel/themePage/ThemePage.tsx'
// import { UserChecklistsPage } from '../pages/userPanel/checklistsPage/ChecklistsPage.tsx'
// import { UserChecklistPage } from '../pages/userPanel/checklistPage/ChecklistPage.tsx'
// import { UserRecipesPage } from '../pages/userPanel/recipesPage/RecipesPage.tsx'
// import { UserStorePage } from '../pages/userPanel/storePage/StorePage.tsx'
import { AuthPage } from '../pages/AuthPage/auth.tsx'

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
				path: 'admin/products/',
				element: (
					<RequireAuth isRootRequire>
						<SubjectsPage />
					</RequireAuth>
				),
			},
			{
				path: 'admin/recipes/',
				element: (
					<RequireAuth isRootRequire>
						<ThemesPage />
					</RequireAuth>
				),
			},
			{
				path: 'user/checklists/',
				// element: (
				// 	<RequireAuth>
				// 		<UserChecklistsPage />
				// 	</RequireAuth>
				// ),
			},
			{
				path: 'user/checklists/:checklistId',
				// element: (
				// 	<RequireAuth>
				// 		<UserChecklistPage />
				// 	</RequireAuth>
				// ),
			},
			{
				path: 'user/recipes/',
				// element: (
				// 	<RequireAuth>
				// 		<UserRecipesPage />
				// 	</RequireAuth>
				// ),
			},
			{
				path: 'user/store/',
				// element: (
				// 	<RequireAuth>
				// 		<UserStorePage />
				// 	</RequireAuth>
				// ),
			},
		],
	},
	{ path: 'auth', element: <AuthPage /> },
])
