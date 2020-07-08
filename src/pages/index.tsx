import { graphql } from 'gatsby';
import React from 'react';
import ArticleItem from '../components/article-item';
import Layout from '../components/layout';
import { Head } from '../components/layout/head';

const BlogIndex = ({ data }) => {
	const IS_DEV = process.env.NODE_ENV === 'development';
	const posts = data.allMarkdownRemark.edges;

	return (
		<Layout>
			<Head title="All posts" slug="" />
			<h1 className="pb-4 text-body lg:text-lg lg:block tracking-tight text-indigo-400 dark:text-fluencyy-400 select-none cursor-default">
				<span>&gt;_ </span>
				<span className="text-indigo-600 dark:text-fluencyy-200">{data.site.siteMetadata.description}</span>
				<span className="blink"> |</span>
			</h1>
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{posts
					.filter(({ node }: any) => IS_DEV || node.frontmatter.published)
					.map(({ node }) => (
						<ArticleItem
							key={node.fields.slug}
							title={node.frontmatter.title || node.fields.slug}
							slug={node.fields.slug}
							readingTime={node.fields.readingTime.text}
							excerpt={node.excerpt}
							frontmatter={node.frontmatter}
						/>
					))}
			</section>
		</Layout>
	);
};

export default BlogIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
						readingTime {
							text
						}
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						datetime: date
						title
						description
						category
						published
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 500) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
				}
			}
		}
	}
`;
