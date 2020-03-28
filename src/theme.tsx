import React, { useEffect, useReducer } from 'react';
import { ThemeState } from './types';
import { ACTION_TYPES } from './util/theme.constants';
import { bodyHasDarkMode, themeReducer, toggleDarkMode } from './util/theme.helpers';

const THEME_STATE: ThemeState = {
	darkMode: true,
	loaded: false,
};

export const ThemeContext = React.createContext({ ...THEME_STATE, toggleDarkMode });

export const ThemeProvider = ({ children }) => {
	const [theme, dispatch] = useReducer(themeReducer, THEME_STATE);

	useEffect(() => {
		// Inline script in index will apply dark mode initially
		dispatch({ type: ACTION_TYPES.SET_DARK_MODE, darkMode: bodyHasDarkMode() });
		dispatch({ type: ACTION_TYPES.MARK_THEME_AS_LOADED });
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				darkMode: theme.darkMode,
				loaded: theme.loaded,
				toggleDarkMode: () => toggleDarkMode({ theme, dispatch }),
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
