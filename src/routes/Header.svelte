<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const routes = ['/', '/work', '/background', '/contact'];
	let pageIdx = 0;

	const navTransition = { duration: 1000, axis: 'y' };
	let y;

	function handleArrowNavigation(event) {
		switch (event.key) {
			case 'ArrowRight':
				pageIdx = (pageIdx + 1) % routes.length;
				break;
			case 'ArrowLeft':
				pageIdx = pageIdx === 0 ? routes.length - 1 : pageIdx - 1;
				break;
			default:
				return;
		}
		goto(routes[pageIdx]);
	}

	let ready = false;
	onMount(() => {
		ready = true;
		pageIdx = routes.indexOf($page.url.pathname);
	});
</script>

<svelte:window on:keydown={handleArrowNavigation} bind:scrollY={y} />

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
						<a href={route} on:click={() => (pageIdx = i)}>
							{route === '/' ? 'home' : route.slice(1)}
						</a>
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

	.current-section a {
		color: var(--background-color);
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

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-secondary);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--background-color);
	}
</style>
