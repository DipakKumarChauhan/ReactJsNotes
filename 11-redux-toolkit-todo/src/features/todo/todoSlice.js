import {createSlice,nanoid} from '@reduxjs/toolkit';

const initialState = {
    todos: [{id:1,text:'Hello World'}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Unlike api context where we just declared function and and later in App.jsx we defined what they had to do
        // Here in redux Tolkit we define and declare the function in same place 
        // Format is 
        // property : (state,action) => {}
            //  State gives access to what is the current state 
            //  Action gives access to what is being passed from the component where this function is being called
        addTodo: (state,action) => {
            const  todo = {
                id: nanoid(),
                text: action.payload  // Note payload is a object which contains the data being passed from the component where this function is being called
            }
            state.todos.push(todo);
        },
        removeTodo: (state,action) => {
            const id = action.payload;
            state.todos = state.todos.filter((eachtodo)=> eachtodo.id !== id);
        },
        updateTodo: (state,action) => {
            const {id,text} = action.payload;
            const todo  =  state.todos.map((eachtodo)=> eachtodo.id === id ? { ...eachtodo, text } : eachtodo)
            state.todos = todo;
        },
        
    }
})

export const {addTodo,removeTodo,updateTodo} = todoSlice.actions;

export default todoSlice.reducer;
