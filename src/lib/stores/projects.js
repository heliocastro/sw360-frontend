import { writable } from 'svelte/store';

export const apiData = writable([]);

const fetchProjects = async () => {
	const url = 'https://projects.eclipse.org/api/projects';
	const res = await fetch(url);
	const data = await res.json();
	const projs = data.map((projects) => {
		return {
			name: projects.name,
			summary: projects.summary,
			url: projects.url
		};
	});
  apiData.set(projs)
};
fetchProjects();
