import { resolve } from 'path';

export const NETLIFY = 'gatsby-plugin-netlify';
export const NETLIFY_CMS = {
	resolve: 'gatsby-plugin-netlify-cms',
	options: {
		modulePath: resolve('src/cms/index.tsx'),
		manualInit: true,
		htmlTitle: 'CMS | console.blog',
	},
};
