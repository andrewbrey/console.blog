const PURGE_CSS = require('@fullhuman/postcss-purgecss')({
	content: ['./src/**/*.tsx', './content/blog/**/*.md'],
	defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
	whitelistPatternsChildren: [/code$/, /pre$/, /token$/, /blockquote$/],
	whitelist: ['mode-dark'],
});

module.exports = {
	plugins: [
		require('tailwindcss'),
		require('postcss-nesting'),
		require('autoprefixer')({}),
		...(process.env.NODE_ENV === 'production' ? [PURGE_CSS] : []),
	],
};
