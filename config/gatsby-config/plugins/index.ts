import { RSS_FEED } from './setup/feed.plugin';
import { ASSETS, BLOG_CONTENT } from './setup/filesystem.plugin';
import { GOOGLE_ANALYTICS } from './setup/google-analytics.plugin';
import { MANIFEST } from './setup/manifest.plugin';
import { NETLIFY } from './setup/netlify.plugin';
import { OFFLINE } from './setup/offline.plugin';
import { POST_CSS } from './setup/postcss.plugin';
import { REACT_HELMET } from './setup/react-helmet.plugin';
import { MARKDOWN_REMARK } from './setup/remark.plugin';
import { SHARP, SHARP_TRANSFORMER } from './setup/sharp.plugin';
import { SITE_MAP } from './setup/sitemap.plugin';
import { TYPESCRIPT } from './setup/typescript.plugin';

export const GATSBY_PLUGINS = [
	BLOG_CONTENT,
	ASSETS,
	MARKDOWN_REMARK,
	SHARP_TRANSFORMER,
	SHARP,
	GOOGLE_ANALYTICS,
	RSS_FEED,
	MANIFEST,
	REACT_HELMET,
	TYPESCRIPT,
	POST_CSS,
	NETLIFY,
	SITE_MAP,
	OFFLINE,
];
