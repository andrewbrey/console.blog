import React from 'react';
import { ThemeProvider } from './src/theme';

export const wrapRootElement = ({ element, props }) => <ThemeProvider {...props}>{element}</ThemeProvider>;
