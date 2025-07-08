import { error } from '@sveltejs/kit';

export const prerender = 'auto';

export async function load({ params }) {
    try {
        const post = await import(`$lib/posts/${params.slug}.js`);

        return {
            html: post.html,
            slug: params.slug
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Post not found: ${params.slug}`);
    }
}

