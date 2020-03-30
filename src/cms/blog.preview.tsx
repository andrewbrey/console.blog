import { format } from 'date-fns';
import React from 'react';
import { DARK_MODE_INDICATOR_CLASS } from '../util/theme.constants';

const BlogPostPreview = (props: any) => {
	const { entry, widgetFor } = props;

	const title = entry.getIn(['data', 'title']);
	const date = entry.getIn(['data', 'date']) || new Date();
	const description = entry.getIn(['data', 'description']);
	const body = widgetFor('body');

	return (
		<article className="p-4 max-w-screen-lg mx-auto">
			<header className="flex flex-col justify-center items-start">
				<div className="flex items-center">
					<div className="flex-shrink-0 bg-smoke-900 w-20 h-20 rounded-full border-2 border-smoke-200">
						<span
							className="text-white cursor-pointer w-full h-full flex items-center justify-center"
							onClick={() => {
								(document.querySelector(
									'iframe[class*="css-"]'
								) as any)?.contentDocument?.documentElement?.classList.toggle(DARK_MODE_INDICATOR_CLASS);
							}}
						>
							Lights
						</span>
					</div>
					<aside className="ml-2">
						<p className="text-lg font-bold leading-none text-indigo-600 dark:text-fluencyy-400">Andrew Brey</p>
						<small className="text-xs leading-none text-smoke-500">
							{format(date, 'LLLL dd, yyyy')} &middot; 7 min read
						</small>
						<p
							className="text-body text-indigo-600 dark:text-fluencyy-300 leading-snug"
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						></p>
					</aside>
				</div>
				<h1 className="pt-4 font-bold text-4xl md:text-5xl leading-tight text-indigo-600 dark:text-fluencyy-400">
					{title}
				</h1>
			</header>
			<hr className="mt-2 mb-16" />
			<section className="markdown text-lg md:text-base tracking-wide leading-relaxed md:leading-loose text-smoke-900 dark:text-smoke-200">
				{body}
			</section>
		</article>
	);
};

export default BlogPostPreview;
