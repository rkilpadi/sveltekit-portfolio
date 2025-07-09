<script>
	import { slide, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { posts } from './data.js';

    function handleNavigation(post) {
        if (post.slug) {
            goto(`${page.url.pathname}/${post.slug}`);
        } else if (post.link) {
            window.location = post.link;
        }
    }
</script>

<div class="blog-list">
    {#each posts as post}
        <button 
            type="button" 
            class="card-button" 
            onclick={() => handleNavigation(post)}
        >
            <h2>{post.title}</h2>
            <h3 class="bottom-info">{post.date}</h3>
            <p>{post.summary}</p>
        </button>
    {/each}
</div>

<style>
	.blog-list {
        margin-left: auto;
        margin-right: auto;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 20px;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	}
</style>

