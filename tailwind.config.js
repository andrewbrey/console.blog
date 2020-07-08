const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: false,
	theme: {
		extend: {
			colors: {
				smoke: {
					100: '#EFF0F0',
					200: '#D8D9D9',
					300: '#C0C3C3',
					400: '#909595',
					500: '#616868',
					600: '#575E5E',
					700: '#3A3E3E',
					800: '#2C2F2F',
					900: '#222222',
				},
				fluencyy: {
					100: '#E9EDEE',
					200: '#C9D3D4',
					300: '#A8B8BA',
					400: '#668387',
					500: '#254E53',
					600: '#21464B',
					700: '#162F32',
					800: '#112325',
					900: '#0B1719',
				},
			},
			fontFamily: {
				sans: ['Sen', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-focus', 'dark-active'],
		borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-focus', 'dark-focus-within'],
		boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
		textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-focus', 'dark-active'],
	},
	plugins: [require('tailwindcss-dark-mode')(), require('@tailwindcss/ui')],
};
