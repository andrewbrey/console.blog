import { resolve } from 'path';

export const BLOG_CONTENT = {
	resolve: 'gatsby-source-filesystem',
	options: {
		path: resolve('content/blog'),
		name: 'blog',
	},
};

export const ASSETS = {
	resolve: 'gatsby-source-filesystem',
	options: {
		path: resolve('content/assets'),
		name: `assets`,
	},
};
