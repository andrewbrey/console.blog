import { graphql, useStaticQuery } from 'gatsby';
import React, { FunctionComponent, ReactElement } from 'react';
import { Helmet } from 'react-helmet';

interface SeoMeta {
	name: string;
	content: string;
}

interface HeadProps {
	description?: string;
	lang?: string;
	meta?: SeoMeta[];
	title: string;
	previewImage?: string;
	slug: string;
	datePublished?: string;
	isBlogPost?: boolean;
}

interface SchemaOrgValues {
	author: {
		name: string;
	};
	siteUrl: string;
	datePublished: string | boolean;
	defaultTitle: string;
	description: string;
	image: string;
	isBlogPost: boolean;
	organization: {
		name: string;
		url: string;
		logo: string;
	};
	title: string;
	url: string;
}

const SchemaDotOrg = React.memo<SchemaOrgValues>(
	({ author, siteUrl, datePublished, defaultTitle, description, image, isBlogPost, organization, title, url }) => {
		const baseSchema = [
			{
				'@context': 'http://schema.org',
				'@type': 'WebSite',
				url,
				name: title,
				alternateName: defaultTitle,
			},
		];

		const schema = isBlogPost
			? [
					...baseSchema,
					{
						'@context': 'http://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{
								'@type': 'ListItem',
								position: 1,
								item: {
									'@id': url,
									name: title,
									image,
								},
							},
						],
					},
					{
						'@context': 'http://schema.org',
						'@type': 'BlogPosting',
						url,
						name: title,
						alternateName: defaultTitle,
						headline: title,
						image: {
							'@type': 'ImageObject',
							url: image,
						},
						description,
						author: {
							'@type': 'Person',
							name: author.name,
						},
						publisher: {
							'@type': 'Organization',
							url: organization.url,
							logo: {
								'@type': 'ImageObject',
								url: organization.logo,
							},
							name: organization.name,
						},
						mainEntityOfPage: {
							'@type': 'WebSite',
							'@id': siteUrl,
						},
						datePublished,
					},
			  ]
			: baseSchema;

		return (
			<Helmet>
				{/* Schema.org tags */}
				<script type="application/ld+json">{JSON.stringify(schema)}</script>
			</Helmet>
		);
	}
);

export const Head: FunctionComponent<HeadProps> = ({
	description = '',
	lang = 'en',
	meta = [],
	previewImage = '',
	title,
	slug,
	datePublished = '',
	isBlogPost = false,
}: HeadProps): ReactElement => {
	const { site, preview } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						logoUrl
						siteUrl
					}
				}
				preview: file(absolutePath: { regex: "/social-card.png/" }) {
					childImageSharp {
						fixed(width: 600) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
		`
	);
	const metaDescription = description || site.siteMetadata.description;
	const metaPreview = `${site.siteMetadata.siteUrl}${previewImage || preview.childImageSharp.fixed.src}`;
	const metaUrl = slug
		? `${site.siteMetadata.siteUrl}${slug.startsWith('/') ? '' : '/'}${slug}`
		: site.siteMetadata.siteUrl;

	return (
		<>
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
						name: `image`,
						content: metaPreview,
					},
					{
						property: `og:url`,
						content: metaUrl,
					},
					{
						property: `og:type`,
						content: `${isBlogPost ? 'article' : 'website'}`,
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
						property: `og:image`,
						content: metaPreview,
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
						content: metaPreview,
					},
					{
						name: `robots`,
						content: 'index,follow',
					},
					{
						name: `googlebot`,
						content: 'index,follow',
					},
				].concat(meta)}
				link={[
					{
						rel: 'canonical',
						href: `${metaUrl}`,
					},
				]}
			/>
			<SchemaDotOrg
				isBlogPost={isBlogPost}
				url={metaUrl}
				title={title}
				image={metaPreview}
				description={metaDescription}
				datePublished={isBlogPost ? datePublished : new Date().toDateString()}
				siteUrl={site.siteMetadata.siteUrl}
				author={{ name: site.siteMetadata.author }}
				organization={{
					logo: site.siteMetadata.logoUrl,
					name: site.siteMetadata.title,
					url: site.siteMetadata.siteUrl,
				}}
				defaultTitle={site.siteMetadata.title}
			/>
		</>
	);
};
