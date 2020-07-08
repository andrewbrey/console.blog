const { resolve } = require('path');
const { theme } = require('./tailwind.config');

const SITE_METADATA = {
	title: 'console.blog',
	author: 'Andrew Brey',
	description: 'Messages about web development, software, technology, and more',
	siteUrl: 'https://blog.andrewbrey.com',
	logoUrl: 'https://res.cloudinary.com/consoleblog/image/upload/v1594078278/logo.png',
};

module.exports = {
	siteMetadata: SITE_METADATA,
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: resolve('content/blog'),
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: resolve('content/assets'),
				name: `assets`,
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 768,
							backgroundColor: 'transparent',
							wrapperStyle:
								'white-space: normal; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 0.25rem; overflow:hidden;',
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					'gatsby-remark-reading-time',
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-162015635-1',
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								author
								siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						output: '/rss.xml',
						title: SITE_METADATA.title,
						site_url: SITE_METADATA.siteUrl,
						feed_url: `${SITE_METADATA.siteUrl}/rss.xml`,
						language: 'en',
						ttl: 10080,
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.description || edge.node.excerpt,
									date: edge.node.frontmatter.date,
									author: site.siteMetadata.author,
									title: edge.node.frontmatter.title,
									categories: [edge.node.frontmatter.category],
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [
										{ 'content:encoded': edge.node.html },
										{ reading_time: edge.node.fields.readingTime.text },
									],
								});
							});
						},
						query: `
							{
								allMarkdownRemark(
									filter: { frontmatter: { published: { eq: true } } },
									sort: { order: DESC, fields: [frontmatter___date] },
								) {
									edges {
										node {
											excerpt
											html
											fields {
												slug
												readingTime {
													text
												}
											}
											frontmatter {
												title
												date
												description
												category
											}
										}
									}
								}
							}
						`,
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: resolve('src/cms/index.tsx'),
				manualInit: true,
				htmlTitle: 'CMS | console.blog',
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: SITE_METADATA.title,
				short_name: SITE_METADATA.title,
				description: SITE_METADATA.description,
				start_url: '/',
				lang: 'en',
				background_color: theme.extend.colors.smoke[900],
				theme_color: theme.extend.colors.smoke[900],
				display: 'standalone',
				orientation: 'portrait',
				icon: 'content/favicon.png',
			},
		},
		'gatsby-plugin-sitemap',
		'gatsby-plugin-offline',
		'gatsby-plugin-netlify',
	],
};
