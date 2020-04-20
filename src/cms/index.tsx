import CMS from 'netlify-cms-app';
import '../styles/main.css';
import BlogPostPreview from './blog.preview';

const IS_DEV = process.env.NODE_ENV === 'development';

CMS.registerPreviewTemplate('blog', BlogPostPreview);

const config: any = {
	site_url: IS_DEV ? 'http://localhost:9000' : 'https://blog.andrewbrey.com',
};

if (IS_DEV) {
	config.local_backend = {
		url: 'http://localhost:9081/api/v1',
	};
}

CMS.init({ config } as any);
