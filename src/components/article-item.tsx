import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { startCase } from 'lodash';
import React from 'react';

const ArticleItem = ({ title, slug, frontmatter, readingTime, excerpt }) => {
	const { placeholder } = useStaticQuery(
		graphql`
			query {
				placeholder: file(absolutePath: { regex: "/blog-placeholder.png/" }) {
					childImageSharp {
						fluid(maxWidth: 600) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	);

	return (
		<Link
			to={slug}
			title={title}
			className="flex outline-none rounded-lg focus:shadow-outline-gray hover:shadow-2xl transition-shadow duration-200"
		>
			<article className="flex-auto flex flex-col border-2 border-transparent dark:border-smoke-200 rounded-lg shadow-lg overflow-hidden">
				<div className="flex-shrink-0">
					{frontmatter.featuredImage ? (
						<Img className="h-48" fluid={frontmatter.featuredImage.childImageSharp.fluid} />
					) : (
						<Img className="h-48" fluid={placeholder.childImageSharp.fluid} />
					)}
				</div>
				<div className="flex-1 bg-white dark:bg-fluencyy-700 p-6 flex flex-col justify-between">
					<div className="flex-1">
						<p className="text-sm leading-5 font-medium text-indigo-600 dark:text-fluencyy-200 flex justify-between">
							<span className="underline">
								{frontmatter.category ? startCase(frontmatter.category) : 'Miscellaneous'}
							</span>
							{!frontmatter.published && (
								<span className="px-1 rounded no-underline bg-indigo-200 text-indigo-800 dark:bg-fluencyy-300 dark:text-fluencyy-800">
									unpublished
								</span>
							)}
						</p>
						<div>
							<h3 className="mt-2 text-2xl leading-7 font-semibold text-smoke-900 dark:text-fluencyy-300">{title}</h3>
							<p
								className="mt-3 text-base leading-5 text-smoke-500 dark:text-fluencyy-400"
								dangerouslySetInnerHTML={{
									__html: frontmatter.description || excerpt,
								}}
							></p>
						</div>
					</div>
					<div className="mt-6 flex items-center">
						<div className="flex text-sm leading-5 text-smoke-500 dark:text-fluencyy-200">
							<time dateTime={frontmatter.datetime}>{frontmatter.date}</time>
							<span className="mx-1">&middot;</span>
							<span>{readingTime}</span>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default ArticleItem;
