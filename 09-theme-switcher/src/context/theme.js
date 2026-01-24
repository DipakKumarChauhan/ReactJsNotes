// This Is Better Production Approach for Context API

import {createContext, useContext} from 'react';

// To Add default value in context we use below syntax 
export const ThemeContext = createContext({
    // Here We have a default object
    theme: 'light',

    darkTheme: () => {},
    lightTheme: () =>{}
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext);  
}