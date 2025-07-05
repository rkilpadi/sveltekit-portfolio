import { writable } from 'svelte/store';

const defaultParticleCount = 2000; 
const defaultStrokeWeight = 1; 

export const repelDistance = writable(0);
export const particleCount = writable(defaultParticleCount);
export const noiseScale = writable(0.005);
export const strokeWeight = writable(defaultStrokeWeight);
export const readingMode = writable(false);
export const particlesSpawned = writable(false);
export const sketchKey = writable(Date.now());

export const refresh = () => { 
    sketchKey.set(Date.now());
    particleCount.set(defaultParticleCount);
    strokeWeight.set(defaultStrokeWeight);
};

