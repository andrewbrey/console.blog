import { ThemeState } from '../types';
import { ACTION_TYPES, DARK_MODE_INDICATOR_CLASS, DARK_MODE_STORAGE_KEY } from './theme.constants';

export function themeReducer(state: ThemeState, action: any): ThemeState {
	switch (action.type) {
		case ACTION_TYPES.TOGGLE_DARK_MODE:
			return { ...state, darkMode: bodyHasDarkMode() };
		case ACTION_TYPES.SET_DARK_MODE:
			return { ...state, darkMode: action.darkMode };
		case ACTION_TYPES.MARK_THEME_AS_LOADED:
			return { ...state, loaded: true };
		default:
			return { ...state };
	}
}

export function toggleDarkMode({ theme, dispatch }): void {
	document.documentElement.classList.toggle(DARK_MODE_INDICATOR_CLASS);

	window.localStorage.setItem(DARK_MODE_STORAGE_KEY, `${!theme.darkMode}`);

	dispatch({ type: ACTION_TYPES.TOGGLE_DARK_MODE });
}

export function bodyHasDarkMode(): boolean {
	return document.documentElement.classList.contains(DARK_MODE_INDICATOR_CLASS);
}
