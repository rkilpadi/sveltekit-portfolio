<script>
	import { slide, fade } from 'svelte/transition';

	const {
		location,
		date,
		company,
		position,
		image,
		bullets = [],
		links = []
	} = $props();

	let expanded = $state(false);
    const expandable = bullets.length > 0 || links.length > 0;
</script>

<button
	class="card-button"
	disabled={!expandable}
	aria-expanded={expanded}
	onclick={() => expanded = !expanded}
    onkeydown={(e) => e.preventDefault()}
>
	{#if image}
		<img class="logo-corner" src={image} alt="" width="70" />
	{/if}
	<h3 class="top-info">{location} — {date}</h3>
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
						<a {href} onclick={e => e.stopPropagation()}>{text}</a>
					{/each}
				</div>
			</div>
		{:else if expandable}
			<i class="arrow" out:fade in:fade></i>
		{/if}
	</div>
</button>

<style>
	img {
		min-height: 50px;
	}

	.card-button:not(:disabled):hover .arrow {
		animation: bounce 1s infinite;
	}

	.logo-corner {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	a {
		margin-right: 30px;
	}

	.expand-container {
		display: grid;
	}

	.expand-item {
		grid-area: 1 / 1;
	}

	.arrow {
		border: solid var(--color-secondary);
		border-width: 0 3px 3px 0;
		display: inline-block;
		padding: 3px;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
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
			padding-bottom: 5px;
		}

		li {
			font-size: 0.7em;
		}

		.links {
			display: flex;
			flex-direction: column;
		}
	}
</style>

