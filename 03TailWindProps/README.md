# Tailwind Props Demo (Hinglish Guide)

Chhota demo project to understand Tailwind + React props basics. Ek card component ko multiple props diye jaate hain (string, object, array), aur Tailwind se quick styling hoti hai.

## Jaldi Setup
- `npm install`
- `npm run dev`
- Browser open: `http://localhost:5173`

## Big Picture (ASCII Flow)
```
App.jsx
	├─ declare data (myObject, myArray)
	├─ render <Card ...props /> multiple times

Card.jsx
	├─ props receive
	├─ show text + image
	└─ Tailwind classes for layout/style
```

## File Map (what + why)
- [src/App.jsx](03TailWindProps/src/App.jsx#L1-L63): Props pass karne ka main example; two Card instances with different `channelName` / `btnText`.
- [src/components/Card.jsx](03TailWindProps/src/components/Card.jsx#L1-L33): Props read + render; object/array destructure nahi kiya, direct props se access for clarity.
- [src/main.jsx](03TailWindProps/src/main.jsx#L1-L11): Vite entry; renders `App`.

## Core Concepts Explained
- **Props kya hain?** Parent → Child data pass karne ka tarika. Child read-only view banata hai.
- **Objects/Arrays as props?** JSX me `{myObject}` / `{myArray}` curly braces se pass karte hain; child me same keys use karo.
- **Tailwind utility use?** Classes like `bg-green-400 text-black p-4 rounded-xl` for quick styling; no custom CSS needed.

## Key Code Snippets
```jsx
// src/App.jsx
let myObject = { username: "Dipak", age: 22, Gender: "Male" }
let myArray = [1, 2, 3]

<Card
	channelName="DipakYT"
	definedObject={myObject}
	definedArray={myArray}
	btnText="clickme"
/> 

<Card
	channelName="DipakYT2"
	definedObject={myObject}
	definedArray={myArray}
	btnText="Mujhe thoko"
/> 
```

```jsx
// src/components/Card.jsx
function Card(props) {
	return (
		<div className="w-60 flex flex-col rounded-xl bg-black min-h-[19rem] text-white p-4">
			<img
				src="https://cdn.vox-cdn.com/...jpg"
				alt="test"
				className="object-cover object-center rounded-t-xl"
			/>
			<div className="flex flex-col py-3 px-3 pb-10">
				<h1 className="font-bold text-lg">{props.channelName}</h1>
				<p>Username: {props.definedObject.username}</p>
				<p>Age: {props.definedObject.age}</p>
				<p>Gender: {props.definedObject.Gender}</p>
				<p>Array: {props.definedArray.join(", ")}</p>
				<p>Button: {props.btnText}</p>
			</div>
		</div>
	)
}
```

## Flow Samjho (step-by-step)
1) Parent (App) data banata hai: object + array + strings.
2) Same Card component 2 bar use hota hai with different props (reusability demo).
3) Card props print karta hai; array join se readable text banta hai.
4) Tailwind classes se quick layout without custom CSS.

## Common Doubts
- **Props mutate kar sakte?** Nahi, read-only. State chahiye to child me `useState` ya parent se state pass karo.
- **Default props?** Add default values inside component (e.g., `props.btnText || "Click"`).
- **Why array/object via braces?** JSX me expressions curly braces ke andar hi evaluate hote hain.

## Practice Ideas
- Card me price/cta props add karo.
- Optional prop ke liye default text set karo.
- Map over array of cards data instead of manual two cards.
- Image URL ko prop banao to cards visually differ karein.

Happy learning! Ab props + Tailwind basics clear hone chahiye.
