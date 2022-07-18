import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			scss: {
				postcss: true,
				includePaths: "src/scss"
			},
			postcss: true,
		})
	],
	kit: {
		adapter: adapter(),
		methodOverride: {
			allowed: ['PUT', 'DELETE']
		}
	}
};

export default config;
