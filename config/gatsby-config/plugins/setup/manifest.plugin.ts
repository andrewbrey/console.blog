import { theme } from '../../../../tailwind.config';
import { SITE_METADATA } from '../../../gatsby-config';

export const MANIFEST = {
	resolve: 'gatsby-plugin-manifest',
	options: {
		name: SITE_METADATA.title,
		short_name: SITE_METADATA.title,
		description: SITE_METADATA.description,
		start_url: '/',
		lang: 'en',
		background_color: theme.extend.colors.smoke[900],
		theme_color: theme.extend.colors.smoke[900],
		display: 'standalone',
		orientation: 'portrait',
		icon: 'content/assets/author-avatar.png',
	},
};
