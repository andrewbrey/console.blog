require('ts-node').register({ files: true });

const { GATSBY_PLUGINS, SITE_METADATA } = require('./config/gatsby-config');

module.exports = {
	siteMetadata: SITE_METADATA,
	plugins: GATSBY_PLUGINS,
};
