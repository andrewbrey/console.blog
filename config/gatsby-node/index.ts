import { CreateNodeArgs, CreatePagesArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import { resolve } from 'path';

type SORT_ORDER = 'ASC' | 'DESC';

const BLOG_POST_TEMPLATE_PATH = 'src/templates/blog-post.tsx';
const MARKDOWN_NODE_TYPE = 'MarkdownRemark';

export async function createMarkdownPages({ graphql, actions }: CreatePagesArgs) {
	const { createPage } = actions;

	const BLOG_POST_TEMPLATE = resolve(BLOG_POST_TEMPLATE_PATH);
	const { errors, data } = await graphql<any, any>(blogPostQuery());

	if (errors) {
		throw errors;
	}

	const { edges: BLOG_POSTS } = data.allMarkdownRemark;

	BLOG_POSTS.forEach((post: any, index: number) => {
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

export async function createMarkdownNode({ node, actions, getNode }: CreateNodeArgs) {
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
function blogPostQuery(sortOrder: SORT_ORDER = 'DESC', queryLimit: number = 1_000) {
	return `
			{
				allMarkdownRemark(sort: { fields: [frontmatter___date], order: ${sortOrder} }, limit: ${queryLimit}) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
							}
						}
					}
				}
			}
		`;
}
