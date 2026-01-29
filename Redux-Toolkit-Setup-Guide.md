# Redux Toolkit: Configuration & Usage Guide

A step-by-step guide to configuring, exporting, and using Redux Toolkit based on the 11-redux-toolkit-todo project.

---

## Step 1: Install Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Step 2: Create a Slice (Feature/Reducer)

A **slice** contains the state, reducers, and actions for a specific feature.

**File:** `src/features/todo/todoSlice.js`

```javascript
import { createSlice, nanoid } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
    todos: [{ id: 1, text: 'Hello World' }]
}

// Create a slice
export const todoSlice = createSlice({
    name: 'todo',              // Name of the slice
    initialState,               // Initial state
    reducers: {                 // Action handlers
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload  // Data passed from component
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            const id = action.payload;
            state.todos = state.todos.filter((eachtodo) => eachtodo.id !== id);
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.map((eachtodo) => 
                eachtodo.id === id ? { ...eachtodo, text } : eachtodo
            )
            state.todos = todo;
        }
    }
})

// Export actions (automatically generated from reducers)
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

// Export reducer as default
export default todoSlice.reducer;
```

### Key Points:
- **State & Action Parameters**: Each reducer receives `(state, action)`
  - `state`: Current state of the slice
  - `action.payload`: Data passed from the component
- **nanoid()**: Generates unique IDs for todos
- **Export actions** for use in components
- **Export reducer** as default for store configuration

---

## Step 3: Configure the Store

A **store** combines all slices into a single Redux store.

**File:** `src/app/store.js`

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer  // Can also be an object with multiple reducers
})
```

### Alternative with Multiple Reducers:
```javascript
export const store = configureStore({
    reducer: {
        todo: todoReducer,
        // Add more reducers here
    }
})
```

---

## Step 4: Wrap App with Provider

Provide the Redux store to your entire app using `Provider` from `react-redux`.

**File:** `src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

---

## Step 5: Use Redux in Components

Use `useDispatch` to dispatch actions and `useSelector` to access state.

**Example in a Component:**

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from '../features/todo/todoSlice';

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos); // Access state
  
  const handleAddTodo = (text) => {
    dispatch(addTodo(text)); // Dispatch action with payload
  }
  
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  }
  
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

---

## Summary: Redux Toolkit Workflow

1. **Install** @reduxjs/toolkit and react-redux
2. **Create Slices** with state, reducers, and actions
3. **Export** actions and reducer from each slice
4. **Configure Store** with `configureStore()`
5. **Provide Store** to app using `<Provider>`
6. **Use Hooks** (`useDispatch`, `useSelector`) in components

---

## Key Differences from Context API

| Feature | Context API | Redux Toolkit |
|---------|------------|--------------|
| Reducer Definition | In App component | In slice file |
| Action Dispatch | Call function directly | `dispatch(action(payload))` |
| State Access | Via context prop | Via `useSelector()` hook |
| Boilerplate | Minimal | Structured |
| Scaling | Better for small apps | Better for large apps |

