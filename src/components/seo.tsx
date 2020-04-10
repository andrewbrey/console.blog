import { graphql, useStaticQuery } from 'gatsby';
import React, { FunctionComponent, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

interface Meta {
	name: string;
	content: string;
}

interface SeoProps {
	description?: string;
	lang?: string;
	meta?: Meta[];
	title: string;
	previewImage?: string;
}

const SEO: FunctionComponent<SeoProps> = ({
	description = '',
	lang = 'en',
	meta = [],
	previewImage = '',
	title,
}: SeoProps): ReactElement => {
	const { site, preview } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
				preview: file(absolutePath: { regex: "/social-card.png/" }) {
					childImageSharp {
						fixed(width: 300) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
		`
	);
	const metaDescription = description || site.siteMetadata.description;

	const metaPreview = previewImage || preview;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					property: `og:image`,
					content: metaPreview.childImageSharp.fixed.src,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					name: `twitter:image`,
					content: metaPreview.childImageSharp.fixed.src,
				},
			].concat(meta)}
		/>
	);
};

export default SEO;
