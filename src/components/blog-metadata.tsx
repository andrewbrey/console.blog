import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';

const BlogMetadata = ({ children, imgClasses = '', stackClasses = '', authorClasses = '' }) => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/author-avatar.png/" }) {
				childImageSharp {
					fixed(width: 80, height: 80) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author
				}
			}
		}
	`);

	const { author } = data.site.siteMetadata;

	return (
		<div className="flex items-center">
			<Image
				className={`flex-shrink-0 h-20 w-20 ${imgClasses}`}
				fixed={data.avatar.childImageSharp.fixed}
				alt={author}
			/>
			<aside className={`ml-2 ${stackClasses}`}>
				<p className={authorClasses}>{author}</p>
				{children}
			</aside>
		</div>
	);
};

export default BlogMetadata;
