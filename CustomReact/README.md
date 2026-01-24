# Custom React Implementation (Hinglish Guide)

React ke under-the-hood kaise kaam karta hai - yeh mini project batata hai! Vanilla JavaScript me ek chhota custom React engine banaya hai jo React element objects ko actual DOM me render karta hai. Perfect to understand React ki core philosophy.

## Jaldi Setup
- Simply open `index.html` in browser
- No build tools, no npm - pure JavaScript!

## Big Picture (ASCII Flow)
```
React Element (JS Object)
  ↓
customRender() function
  ↓ creates DOM element
  ↓ sets innerHTML
  ↓ loops through props → setAttribute()
  ↓
Appends to mainContainer (#root)
  ↓
Element visible in browser!
```

## File Map (what + why)
- [index.html](CustomReact/index.html#L1-L11): Simple HTML with `<div id="root">` and script tag.
- [customReact.js](CustomReact/customReact.js#L1-L35): Custom rendering engine + React element object definition.

## The Core Idea: React Element as Object

React me JSX jo dikhta hai:
```jsx
<a href="https://google.com" target="_blank">Click me to visit google</a>
```

Actually behind the scenes ek **object** ban jaata hai:
```javascript
const reactElement = {
  type: 'a',
  props: {
    href: "https://google.com",
    target: "_blank"
  },
  children: "Click me to visit google"
}
```

Yeh object React internally create karta hai, aur phir DOM me render karta hai.

## Custom Render Function Explained

### Version 1 (Hardcoded - Not Flexible)
```javascript
function customRender(reactElement, container) {
  const domElement = document.createElement(reactElement.type)
  domElement.innerHTML = reactElement.children
  domElement.setAttribute('href', reactElement.props.href)
  domElement.setAttribute('target', reactElement.props.target)
  
  container.appendChild(domElement)
}
```

**Problem**: Har prop ke liye manually `setAttribute` karna padega. Not scalable!

### Version 2 (Dynamic - Production Ready)
```javascript
function customRender(reactElement, container) {
  // Step 1: Create DOM element based on type
  const domElement = document.createElement(reactElement.type)
  
  // Step 2: Set inner content
  domElement.innerHTML = reactElement.children
  
  // Step 3: Loop through all props and set attributes dynamically
  for (const prop in reactElement.props) {
    if (prop === 'children') continue;  // Skip children if in props
    domElement.setAttribute(prop, reactElement.props[prop])
  }
  
  // Step 4: Append to container
  container.appendChild(domElement)
}
```

**Benefits**:
- ✅ Dynamic: Works with any number of props
- ✅ Flexible: Add/remove props easily
- ✅ Scalable: No hardcoding needed

## Complete Code Breakdown

```javascript
// Custom rendering engine
function customRender(reactElement, container) {
  // Create element from type (e.g., 'a', 'div', 'button')
  const domElement = document.createElement(reactElement.type)
  
  // Set the text content
  domElement.innerHTML = reactElement.children
  
  // Dynamically set all attributes from props
  for (const prop in reactElement.props) {
    if (prop === 'children') continue;  // Children already handled
    
    // Key-value pair: prop name = key, props[prop] = value
    domElement.setAttribute(prop, reactElement.props[prop])
  }
  
  // Inject into DOM
  container.appendChild(domElement)
}

// React element object (similar to what JSX compiles to)
const reactElement = {
  type: 'a',              // HTML tag name
  props: {                // Attributes
    href: "https://google.com",
    target: "_blank"
  },
  children: "Click me to visit google"  // Inner text
}

// Get root container
const mainContainer = document.getElementById('root')

// Render!
customRender(reactElement, mainContainer)
```

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom React</title>
</head>
<body>
  <!-- Root container where React renders -->
  <div id="root"></div>
  
  <!-- Custom React engine -->
  <script src="./customReact.js"></script>
</body>
</html>
```

## Step-by-Step Execution Flow

1. **Browser loads HTML**: `<div id="root">` empty container ready
2. **Script executes**: `customReact.js` runs
3. **reactElement object created**: Properties defined (type, props, children)
4. **mainContainer selected**: `document.getElementById('root')` gets the div
5. **customRender called**: With element + container as arguments
6. **DOM element created**: `document.createElement('a')` → `<a></a>`
7. **Children set**: `innerHTML = "Click me..."` → `<a>Click me...</a>`
8. **Loop through props**:
   - `href` found → `setAttribute('href', 'https://google.com')`
   - `target` found → `setAttribute('target', '_blank')`
9. **Element complete**: `<a href="..." target="_blank">Click me...</a>`
10. **Append to root**: Link now visible in browser!

## React vs Custom React Comparison

| Feature | Custom React | Real React |
|---------|--------------|------------|
| **Element format** | Plain object | JSX → Babel → object |
| **Render logic** | Simple loop | Virtual DOM + diffing |
| **Performance** | Direct DOM manipulation | Batched updates, reconciliation |
| **Complexity** | ~15 lines | Thousands of lines |
| **Purpose** | Educational | Production-ready |

## Key Concepts Illustrated

### 1. React Elements are Objects
JSX syntax is **syntactic sugar**. Behind the scenes, React converts JSX to objects:
```jsx
// JSX (what you write)
<div className="container">Hello</div>

// Object (what React creates)
{
  type: 'div',
  props: { className: 'container' },
  children: 'Hello'
}
```

### 2. Rendering is Transformation
Rendering = Converting object representation → real DOM nodes.

### 3. Props are Key-Value Pairs
```javascript
for (const prop in reactElement.props) {
  domElement.setAttribute(prop, reactElement.props[prop])
}
```
Yeh loop har prop ko iterate karke DOM attribute set karta hai.

### 4. Separation of Concerns
- **Data layer**: `reactElement` object (what to render)
- **Rendering layer**: `customRender()` function (how to render)

## Common Doubts

**Q: Real React me yeh actual process hai?**  
A: Concept similar hai, but React actual me Virtual DOM use karta hai, diffing algorithm chalaata hai, batched updates karta hai. Yeh simplified version hai.

**Q: JSX kahan hai?**  
A: JSX compile-time me Babel se objects me convert hota hai. Yahan directly object bana diya understanding ke liye.

**Q: Children array ho sakte hain?**  
A: Haan! Real React me:
```javascript
children: [
  "Text node",
  { type: 'span', props: {}, children: 'Nested' }
]
```
Fir recursion se render karo.

**Q: Why `continue` for children?**  
A: Children already `innerHTML` se handle ho gaya. Agar props me bhi `children` key hai, to skip karo to avoid duplication.

**Q: Events kaise add kare?**  
A:
```javascript
if (prop.startsWith('on')) {
  // onclick → click
  const eventName = prop.substring(2).toLowerCase()
  domElement.addEventListener(eventName, reactElement.props[prop])
} else {
  domElement.setAttribute(prop, reactElement.props[prop])
}
```

## Practice Ideas

- **Multiple elements**: Create array of elements and render loop me.
- **Nested children**: Support object children, not just strings (recursion).
- **Event handlers**: Add support for `onClick`, `onMouseOver` etc.
- **Styling**: Add `style` prop object → `element.style[key] = value`.
- **Component function**: Create `createElement()` function like React:
  ```javascript
  function createElement(type, props, children) {
    return { type, props, children }
  }
  ```
- **State management**: Add a simple `useState` hook implementation.
- **Re-rendering**: Implement diffing to update only changed parts.

## Real React's createElement

Actual React syntax behind JSX:
```javascript
// JSX
<a href="https://google.com" target="_blank">Click me</a>

// Compiles to
React.createElement(
  'a',
  { href: 'https://google.com', target: '_blank' },
  'Click me'
)
```

Tumhara custom implementation isi concept ka baby version hai!

## Key Takeaways

✅ React elements = JavaScript objects  
✅ JSX is syntactic sugar for objects  
✅ Rendering = Object → DOM transformation  
✅ Props = Dynamic attribute injection  
✅ Loops make code flexible & scalable  
✅ Separation: data structure vs render logic  

Yeh project React ki **soul** dikhata hai - "UI as data". Once you understand this, React's entire philosophy clear ho jata hai!

Happy learning! Ab tum React ke internals ko behtar samjhoge. 🚀