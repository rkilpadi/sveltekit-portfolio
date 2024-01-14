import { writable } from 'svelte/store';

export const settings = writable({
	playing: true,
	repelDistance: 0,
	particleCount: 2000,
	noiseScale: 0.005,
	strokeWeight: 1
});

export const sketchKey = writable(Date.now());
