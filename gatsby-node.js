const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

module.exports = {
	createPages: createMarkdownPages,
	onCreateNode: createMarkdownNode,
};

const BLOG_POST_TEMPLATE_PATH = 'src/templates/blog-post.tsx';
const MARKDOWN_NODE_TYPE = 'MarkdownRemark';
const IS_DEV = process.env.NODE_ENV === 'development';

async function createMarkdownPages({ graphql, actions }) {
	const { createPage } = actions;

	const BLOG_POST_TEMPLATE = resolve(BLOG_POST_TEMPLATE_PATH);
	const { errors, data } = await graphql(blogPostQuery());

	if (errors) {
		throw errors;
	}

	const { edges: BLOG_POSTS } = data.allMarkdownRemark;

	BLOG_POSTS.filter(post => IS_DEV || post.node.frontmatter.published).forEach((post, index) => {
		const previous = index === BLOG_POSTS.length - 1 ? null : BLOG_POSTS[index + 1].node;
		const next = index === 0 ? null : BLOG_POSTS[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: BLOG_POST_TEMPLATE,
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	});
}

async function createMarkdownNode({ node, actions, getNode }) {
	const { createNodeField } = actions;

	if (node.internal.type === MARKDOWN_NODE_TYPE) {
		const value = createFilePath({ node, getNode });

		createNodeField({
			name: 'slug',
			node,
			value,
		});
	}
}

/**
 * Construct a GraphQL query for blog posts
 */
function blogPostQuery(sortOrder = 'DESC', queryLimit = 1_000) {
	return `
			{
				allMarkdownRemark(filter: { frontmatter: { published: { in: [true,${
					IS_DEV ? 'false' : ''
				}] } } }, sort: { fields: [frontmatter___date], order: ${sortOrder} }, limit: ${queryLimit}) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title,
								published
							}
						}
					}
				}
			}
		`;
}
