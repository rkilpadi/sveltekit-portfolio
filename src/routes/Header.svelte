<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const routes = ['/', '/work', '/projects', '/background', '/contact'];
	let pageIdx = $state(0);
	let y = $state(0);
    let isMobile = $state(false);
	let showMobileMenu = $state(false);

    function navigate(newPageIdx) {
        showMobileMenu = false;
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

    function checkWidth() {
        isMobile = window.innerWidth < 768;
    }

    let ready = $state(false);
	onMount(() => {
        ready = true;
		checkWidth();
		pageIdx = routes.indexOf(`/${page.url.pathname.split('/')[1]}`);
	});
</script>

<svelte:window onkeydown={handleArrowNavigation} bind:scrollY={y} onresize={checkWidth} />

<svelte:head>
	<meta charset="UTF-8" />
	<title>Ryan Kilpadi</title>
</svelte:head>

{#snippet navigationLinks()}
	{#each routes as route, i}
		<li class:current-section={pageIdx === i}>
			<button onclick={() => navigate(i)}>
				{route === '/' ? 'home' : route.slice(1)}
			</button>
		</li>
	{/each}
{/snippet}

<header>
        {#if isMobile}
			<div class="mobile-header">
				<button
					class="hamburger"
					onclick={() => showMobileMenu = !showMobileMenu}
					aria-label="Open navigation menu"
				>
					<div class="bar"></div>
					<div class="bar"></div>
					<div class="bar"></div>
				</button>
			</div>
			{#if showMobileMenu}
				<nav class="mobile-nav" transition:slide={{ duration: 300, axis: 'x' }}>
					<ul>
                        {@render navigationLinks()}
					</ul>
				</nav>
			{/if}
        {:else}
            {#if ready && y < 50}
                <nav in:slide={{ duration: 300, axis: 'y' }}>
                    <svg viewBox="0 0 2 3" aria-hidden="true">
                        <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
                    </svg>
                    <ul class="desktop-ul">
                        {@render navigationLinks()}
                    </ul>
                    <svg viewBox="0 0 2 3" aria-hidden="true">
                        <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
                    </svg>
                </nav>
            {/if}
        {/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
        z-index: 1;
	}

	nav {
		display: flex;
		justify-content: center;
		width: 100vw;
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
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.desktop-ul {
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

	.current-section button,
    button:hover {
		color: var(--background-color);
	}

    .mobile-nav .current-section button,
    .mobile-nav button:hover {
		color: var(--color-primary);
    }

    .mobile-header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0.5rem;
		width: 100%;
        position: fixed;
        z-index: 1;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: none;
		cursor: pointer;
        margin-right: 30px;
        margin-top: 5px;
	}

	.hamburger .bar {
		width: 2rem;
		height: 0.25rem;
		background: white;
		border-radius: 10px;
		transition: all 0.3s linear;
	}

    .mobile-nav {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: 100vw;
		background: var(--primary-color);
		box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(15px);
	}

	.mobile-nav ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 2rem;
        height: 70vh;
	}

	.mobile-nav li {
		width: 100vh;
	}

	.mobile-nav button {
		width: 100%;
		font-size: 1.3rem;
		justify-content: center;
	}
</style>

