module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'sw360-orange': '#f7941e',
				'sw360-focus': '#F0F5FF',
				'sw360-grey': '#C1C5C8',
				'sw360-darkgrey': '#b8b7c1',
				'sw360-paleorange': '#F9D1A2',
				'sw360-navyblue': '#5D8EA9',
				'sw360-paleblue': '#EBF0F5',
				'sw360-headergray': '#30313F',
			}
		}
	},
	plugins: [
		require('autoprefixer'),
		require('tailwindcss'),
		require('tailwindcss-debug-screens'),
	]
};
