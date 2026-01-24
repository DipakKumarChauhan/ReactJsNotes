# React Router Ecommerce-ish Demo (Hinglish Guide)

Single-page app with React Router v6.4+ nested routes, layout header/footer reuse, dynamic params, and a loader-based API call. Hinglish + easy walkthrough.

## Jaldi Setup
- Install: `npm install`
- Run dev server: `npm run dev`
- Open: usually `http://localhost:5173`

## Big Picture (ASCII Flow)
```
main.jsx -> RouterProvider(router)
router = /
	element: Layout (Header + Outlet + Footer)
	children:
		""        -> Home
		about      -> About
		contact    -> Contact
		user/:id   -> User (dynamic)
		github     -> Github (with loader fetch)
```

Layout ensures Header/Footer constant, only Outlet swaps per route.

## File Map (what + why)
- [src/main.jsx](07react-router-ecommerce-type/src/main.jsx#L1-L40): Creates browser router with nested routes + loader; mounts RouterProvider.
- [src/Layout.jsx](07react-router-ecommerce-type/src/Layout.jsx#L1-L24): Common shell (Header, Outlet, Footer) for all routes.
- [src/components/Header/Header.jsx](07react-router-ecommerce-type/src/components/Header/Header.jsx#L1-L74): Nav with `NavLink` active styling.
- [src/components/Footer/Footer.jsx](07react-router-ecommerce-type/src/components/Footer/Footer.jsx#L1-L120): Footer links reused everywhere.
- [src/components/Home/Home.jsx](07react-router-ecommerce-type/src/components/Home/Home.jsx#L1-L41): Hero-ish landing.
- [src/components/About/About.jsx](07react-router-ecommerce-type/src/components/About/About.jsx#L1-L25): About section.
- [src/components/Contact/ContactUs.jsx](07react-router-ecommerce-type/src/components/Contact/ContactUs.jsx#L1-L101): Contact form layout.
- [src/components/User/User.jsx](07react-router-ecommerce-type/src/components/User/User.jsx#L1-L11): Dynamic `:userid` param display.
- [src/components/Github/Github.jsx](07react-router-ecommerce-type/src/components/Github/Github.jsx#L1-L28): Loader-driven GitHub API fetch + avatar.

## Core Router Setup (kyun aur kaise)
```jsx
// src/main.jsx
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route path='' element={<Home />} />          // index route
			<Route path='about' element={<About />} />
			<Route path='contact' element={<Contact />} />
			<Route path='user/:userid' element={<User />} /> // dynamic segment
			<Route
				path='github'
				element={<Github />}
				loader={githubInfoLoader} // data fetch before render
			/>
		</Route>
	)
)
```

RouterProvider in `main.jsx` mounts the router; saare routes ab SPA navigation ke through handle honge, full page reload nahi.

## Layout Reuse
```jsx
// src/Layout.jsx
<>
	<Header />   // fixed top nav
	<Outlet />   // yahan child route render hoga
	<Footer />   // fixed footer
</>
```

Outlet ensures sirf middle content swap hota hai, header/footer remain.

## Active Nav Highlight with NavLink
```jsx
// src/components/Header/Header.jsx
<NavLink to='/about'
	className={({ isActive }) =>
		`block py-2 ... ${isActive ? "text-orange-700" : "text-gray-700"}`
	}
>
	About
</NavLink>
```
`isActive` se conditional classes milte hain for current route.

## Loader-based Data Fetch (GitHub page)
```jsx
// src/components/Github/Github.jsx
export const githubInfoLoader = async () => {
	const response = await fetch('https://api.github.com/users/DipakKumarChauhan')
	return response.json()
}

const data = useLoaderData() // data ready before component render
```
Benefits: data preloads, SSR-friendly, caching by router.

## Dynamic Params Example
```jsx
// src/components/User/User.jsx
const { userid } = useParams()
return <div>User: {userid}</div>
```
URL `/user/42` renders "User: 42".

## Styling Note
Tailwind utility classes used for quick layout (Header/Footer/Home etc.). Dark/light not configured here; purely layout styling.

## Common Doubts
- **Index route kaise?** Empty path `''` inside parent acts as `/` index.
- **Why Layout?** Reuse nav/footer without duplicating per page.
- **Why NavLink over Link?** Active state styling gets `isActive` prop.
- **Loader vs useEffect?** Loader fetches before render; better UX and works with data routers.

## Practice Ideas
- Add 404 route with `path='*'` and friendly message.
- Add loading/error UI for GitHub loader using `useNavigation` and errorElement.
- Add nested routes under `/about` for team/history to see deeper Outlet usage.
- Replace hardcoded GitHub username with route param or search box.

Happy routing! Ab tum easily nested routes, loaders, aur dynamic params setup kar sakte ho.
