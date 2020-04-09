import { SITE_METADATA } from '../../index';

export const RSS_FEED = {
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
				feed_url: `${SITE_METADATA.siteUrl}rss.xml`,
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
};
