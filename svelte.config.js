// import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				postcss: true,
				includePaths: "src/scss"
			}
		})
	],
	kit: {
		// adapter: adapter(),

		vite: {
			define: {
				'process.env': process.env
			},
		}
	}
};

export default config;
