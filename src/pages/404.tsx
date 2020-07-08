import React from 'react';
import Layout from '../components/layout';
import { Head } from '../components/layout/head';

const NotFoundPage = ({ location }) => {
	return (
		<Layout>
			<Head title="404: Not Found" slug="404" />
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
