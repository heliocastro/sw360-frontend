module.exports = {
	root: true,
	parser: '@javascript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@javascript-eslint/recommended', 'prettier'],
	plugins: ['svelte3'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
