import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

export default {
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
	}
};
