const REMARK_IMAGES = {
	resolve: 'gatsby-remark-images',
	options: {
		maxWidth: 768,
		backgroundColor: 'transparent',
		wrapperStyle:
			'white-space: normal; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 0.25rem; overflow:hidden;',
	},
};
const REMARK_RESPONSIVE_IFRAME = {
	resolve: 'gatsby-remark-responsive-iframe',
	options: {
		wrapperStyle: `margin-bottom: 1.0725rem`,
	},
};

export const MARKDOWN_REMARK = {
	resolve: 'gatsby-transformer-remark',
	options: {
		plugins: [
			REMARK_IMAGES,
			REMARK_RESPONSIVE_IFRAME,
			'gatsby-remark-reading-time',
			'gatsby-remark-prismjs',
			'gatsby-remark-copy-linked-files',
			'gatsby-remark-smartypants',
		],
	},
};
