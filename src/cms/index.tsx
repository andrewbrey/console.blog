import CMS from 'netlify-cms-app';
// import cloudinary from 'netlify-cms-media-library-cloudinary';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import '../styles/main.css';
import BlogPostPreview from './blog.preview';

const IS_DEV = process.env.NODE_ENV === 'development';

const createRoot = () => {
	const $root = document.createElement('div');
	const styleOverrides = document.createElement('style');
	styleOverrides.textContent = `
	.Pane1 [class*='ControlPaneContainer']:not([class*='PreviewPaneContainer']) {
		padding-bottom: 40vh;
	}
	`;
	document.body.appendChild(styleOverrides);
	document.body.appendChild($root);
	return $root;
};

const CMS_APP = () => {
	useEffect(() => {
		CMS.registerPreviewTemplate('blog', BlogPostPreview);

		CMS.init({
			config: {
				local_backend: IS_DEV
					? {
							url: 'http://localhost:9081/api/v1',
					  }
					: false,
				site_url: IS_DEV ? 'http://localhost:9000' : 'https://blog.andrewbrey.com',
				// media_library: {
				// 	name: 'cloudinary',
				// 	config: {
				// 		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				// 		api_key: process.env.CLOUDINARY_API_KEY,
				// 	},
				// },
			},
		} as any);
	}, []);

	return <div id="nc-root" className="stencilbook-custom-cms"></div>;
};

render(<CMS_APP />, createRoot());
