<script>
	import { experiences } from './data.js';
	import Card from './WorkCard.svelte';
    // import BaseCard from '$lib/components/BaseCard.svelte';
</script>

<div class="experience-list">
    {#each experiences as experience}
        <Card {...experience} />
    {/each}
    <a href="/resume.pdf">View full resume</a>
</div>

<style>
	.experience-list {
        margin-left: auto;
        margin-right: auto;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 20px;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}
</style>

