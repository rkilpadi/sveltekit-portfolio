<script>
	import { slide, fade } from 'svelte/transition';
	export let location;
	export let date;
	export let company;
	export let position;
	export let image;
	export let bullets = [];
	export let links = [];

	let expanded = false;
    const expandable = bullets.length > 0 || links.length > 0;
</script>

<div class="work-card" style="cursor: {expandable ? 'pointer' : 'auto'}" on:click={() => (expanded = !expanded)}>
	{#if image}
		<img class="logo-corner" src={image} alt="" width="70" />
	{/if}

	<h3 class="top-info">{location} | {date}</h3>
	<h2>{company}</h2>
	<h3 class="bottom-info">{position}</h3>

	<div class="expand-container">
		{#if expanded && expandable}
			<div class="expand-item" in:slide out:slide>
				<ul>
					{#each bullets as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
				<div class="links">
					{#each links as [text, href]}
						<a {href}>{text}</a>
					{/each}
				</div>
			</div>
		{:else if expandable}
			<i class="arrow" out:fade in:fade />
		{/if}
	</div>
</div>

<style>
	.work-card {
		border: 1px solid var(--color-primary);
		border-radius: 5px;
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		padding: 20px;
		margin-bottom: 20px;
		transition: 0.3s;
		color: var(--color-secondary);
        position: relative;
	}

	.work-card h2 {
		margin: 10px 0;
		font-size: 1.5em;
		color: var(--color-primary);
	}

	.work-card img {
		min-height: 50;
	}

	.work-card:hover {
		transform: scale(1.03);
	}

	.work-card:hover .arrow {
		animation: bounce 1s infinite;
	}

	.logo-corner {
		position: absolute;
		top: 30px;
		right: 30px;
	}

	.links {
		display: flex;
		justify-context: space-between;
	}

	a {
		margin-right: 30px;
	}

	.expand-container {
		display: grid;
	}

	.expand-item {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}

	.arrow {
		border: solid var(--color-secondary);
		border-width: 0 3px 3px 0;
		display: inline-block;
		padding: 3px;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		text-align: center;
		position: absolute;
		bottom: 20px;
		right: 30px;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0) rotate(45deg);
		}
		50% {
			transform: translateY(-5px) rotate(45deg);
		}
	}

	@media only screen and (max-width: 768px) {
		img {
			display: none;
		}

		.top-info {
			font-size: 0.7em;
		}

		.bottom-info {
			font-size: 0.9em;
		}

		a {
			font-size: 0.7em;
		}
	}
</style>

