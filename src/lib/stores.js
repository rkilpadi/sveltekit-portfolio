import { writable } from "svelte/store";

export const p5Settings = writable({
    playing: true,
    repel: false,
    repelDistance: 50,
    particleCount: 2000,
    noise: 5,
    strokeWeight: 1,
});
