<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { refresh } from '$lib/sketchStores.js';

	const routes = ['/', '/work', '/projects', '/background', '/contact'];
	let pageIdx = $state(0);

	const navTransition = { duration: 1000, axis: 'y' };
	let y = $state();

    function navigate(newPageIdx) {
        pageIdx = newPageIdx;
        goto(routes[pageIdx]);
    }

	function handleArrowNavigation(event) {
        if (event.key === 'ArrowRight') {
            navigate((pageIdx + 1) % routes.length);
        } else if (event.key === 'ArrowLeft') {
            navigate(pageIdx === 0 ? routes.length - 1 : pageIdx - 1);
        }
	}

	let ready = $state(false);
	onMount(() => {
		ready = true;
		pageIdx = routes.indexOf(page.url.pathname);
	});
</script>

<svelte:window onkeydown={handleArrowNavigation} bind:scrollY={y} />

<svelte:head>
	<meta charset="UTF-8" />
	<title>Ryan Kilpadi</title>
</svelte:head>

<header>
	{#if ready && y < 50}
		<nav in:slide={navTransition}>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
			</svg>
			<ul>
				{#each routes as route, i}
					<li class:current-section={pageIdx === i}>
						<button onclick={() => navigate(i)}>
							{route === '/' ? 'home' : route.slice(1)}
						</button>
					</li>
				{/each}
			</ul>
			<svg viewBox="0 0 2 3" aria-hidden="true">
				<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
			</svg>
		</nav>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		width: 100vw;
		--background: var(--color-primary);
		position: fixed;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--color-primary);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--color-primary);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav button {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: #ffffff;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
        cursor: pointer;
        border: none;
        background-color: transparent;
	}

	.current-section button {
		color: var(--background-color);
	}

	button:hover {
		color: var(--background-color);
	}
</style>

