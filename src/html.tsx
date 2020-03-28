import React from 'react';
import { DARK_MODE_INDICATOR_CLASS, DARK_MODE_STORAGE_KEY } from './util/theme.constants';

const HTML = ({ htmlAttributes, postBodyComponents, headComponents, bodyAttributes, preBodyComponents, body }) => (
	<html className={`${DARK_MODE_INDICATOR_CLASS} antialiased font-sans`} {...htmlAttributes}>
		<head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			{headComponents}
		</head>
		<body {...bodyAttributes}>
			<script
				dangerouslySetInnerHTML={{
					__html: `
              (function() {

                try {
									var PREFERS_COLOR_SCHEME_LIGHT = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
                  var STORED_DARK_MODE = window.localStorage.getItem('${DARK_MODE_STORAGE_KEY}');

									if(STORED_DARK_MODE === 'false' || (STORED_DARK_MODE === null && PREFERS_COLOR_SCHEME_LIGHT)) {
										document.documentElement.classList.remove('${DARK_MODE_INDICATOR_CLASS}');
									}
                } catch (err) { }
              })();
            `,
				}}
			/>
			{preBodyComponents}
			<div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
			{postBodyComponents}
		</body>
	</html>
);

export default HTML;
