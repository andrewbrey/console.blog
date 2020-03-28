require('ts-node').register({ files: true });

const { createMarkdownNode, createMarkdownPages } = require('./config/gatsby-node');

module.exports = {
	createPages: createMarkdownPages,
	onCreateNode: createMarkdownNode,
};
