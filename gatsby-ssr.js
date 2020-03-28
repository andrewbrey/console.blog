const React = require('react');
const { ThemeProvider } = require('./src/theme');

exports.wrapPageElement = ({ element, props }) => <ThemeProvider {...props}>{element}</ThemeProvider>;
