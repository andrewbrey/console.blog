import CMS from 'netlify-cms-app';
import '../styles/main.css';
import BlogPostPreview from './blog.preview';

const IS_DEV = process.env.NODE_ENV === 'development';

CMS.registerPreviewTemplate('blog', BlogPostPreview);

CMS.init({
	config: {
		local_backend: IS_DEV,
		site_url: IS_DEV ? 'http://localhost:8000' : 'https://blog.andrewbrey.com',
	},
} as any);
