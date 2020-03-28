import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = ({ location }) => {
	return (
		<Layout>
			<SEO title="404: Not Found" />
			<section className="flex-auto flex flex-col justify-center items-center dark:text-smoke-200">
				<aside className="text-center">
					<h1 className="text-2xl font-bold font-mono">404 Not Found</h1>
					<p className="tracking-wide">
						The page <span className="underline">{location.pathname}</span> doesn't exist.
					</p>
				</aside>
			</section>
		</Layout>
	);
};

export default NotFoundPage;
