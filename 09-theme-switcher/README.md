# Theme Switcher (Hinglish Guide)

Chhota sa React + Tailwind v4 demo jahan light/dark theme toggle hota hai via Context API. Yeh README beginner-friendly hai: kya hai, kyun hai, aur kaise chal raha hai sab explain.

## Jaldi Setup
- Install deps: `npm install`
- Dev server: `npm run dev`
- Browser open: `http://localhost:5173`

## Big Picture (ASCII Flow)
```
App.jsx
	↓ wraps
ThemeProvider (value: { themeMode, lightTheme, darkTheme })
	↓ context value share
ThemeBtn.jsx → toggle switch → calls darkTheme / lightTheme
Card.jsx     → uses Tailwind `dark:` classes → UI theme change

Side effect: App useEffect adds `.light` or `.dark` class to <html>
```

## Files Map (what + why)
- [tailwind.config.js](09-theme-switcher/tailwind.config.js#L1-L13): `darkMode: "class"` set; content paths for purge.
- [src/index.css](09-theme-switcher/src/index.css#L1-L46): Tailwind v4 directives with `@config` pointing to project config.
- [src/App.jsx](09-theme-switcher/src/App.jsx#L1-L41): Theme state, effect to toggle html class, wraps app in `ThemeProvider`.
- [src/context/theme.js](09-theme-switcher/src/context/theme.js#L1-L12): Context + custom hook for consuming.
- [src/components/ThemeBtn.jsx](09-theme-switcher/src/components/ThemeBtn.jsx#L1-L32): Toggle switch that calls `darkTheme` / `lightTheme`.
- [src/components/Card.jsx](09-theme-switcher/src/components/Card.jsx#L1-L70): Sample UI using `dark:` classes to show theme impact.

## Concept: Dark Mode via Context + Tailwind
1) **State + actions**: `themeMode` holds "light"/"dark". Functions `lightTheme`, `darkTheme` change it.
2) **Context share**: `ThemeProvider` pass `{ themeMode, lightTheme, darkTheme }` to subtree; no prop drilling.
3) **DOM class switch**: `useEffect` removes old class and adds new one on `<html>`. Tailwind`s `dark` variant listens to `.dark` on root.
4) **UI consumes**: Toggle checkbox reads `themeMode === "dark"` and calls actions on change. Components use `dark:` utilities.

## Key Code Snippets
```jsx
// src/App.jsx (core logic)
const [themeMode, setThemeMode] = useState("light")

const lightTheme = () => setThemeMode("light")
const darkTheme = () => setThemeMode("dark")

useEffect(() => {
	const root = document.querySelector('html')
	root.classList.remove("light", "dark")
	root.classList.add(themeMode)
}, [themeMode])

return (
	<ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
		{/* rest of UI */}
	</ThemeProvider>
)
```

```jsx
// src/components/ThemeBtn.jsx (toggle control)
const { themeMode, lightTheme, darkTheme } = useTheme()

const onChangeBtn = (e) => {
	if (e.currentTarget.checked) darkTheme()
	else lightTheme()
}

<input
	type="checkbox"
	onChange={onChangeBtn}
	checked={themeMode === "dark"}
	className="sr-only peer"
/>
```

```jsx
// src/context/theme.js (context & hook)
import { createContext, useContext } from 'react'

export const ThemeContext = createContext({
	theme: 'light',
	darkTheme: () => {},
	lightTheme: () => {},
})

export const ThemeProvider = ThemeContext.Provider
export default function useTheme() {
	return useContext(ThemeContext)
}
```

```javascript
// tailwind.config.js (important for dark mode)
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // Tailwind will look for .dark on root
	theme: { extend: {} },
	plugins: [],
}
```

```css
/* src/index.css (Tailwind v4 setup) */
@config "../tailwind.config.js";
@import "tailwindcss";
```

## Flow Explanation (step-by-step)
- App mount → `themeMode` default "light" → `useEffect` sets `<html class="light">`.
- User toggles switch → `checked` true → `darkTheme()` → state "dark" → effect updates `<html class="dark">`.
- Tailwind `dark:` utilities now apply (e.g., `dark:bg-gray-800` in Card), UI flips theme.
- Toggle off → back to "light" → classes revert.

## Common Doubts
- **Why add class on `<html>`?** Tailwind `darkMode: "class"` checks `.dark` on root; safest to set on `html` so full page follows.
- **Tailwind v4 config needed?** Haan, v4 me `@config` directive CSS me lagana padta hai (done in index.css) warna custom config ignore ho sakta hai.
- **Context kyu?** Theme actions/state ko multiple components me share karna hai bina prop drilling.

## Practice Ideas
- LocalStorage persistence add karo (initial state read + effect write).
- Animate toggle knob with transition duration.
- Add system-theme button: detect `window.matchMedia('(prefers-color-scheme: dark)')` and set accordingly.
- Add more components with `dark:` utilities to observe changes (navbar/footer).

Happy theming! Ab light/dark toggle ka pura flow samajh aa jana chahiye.
