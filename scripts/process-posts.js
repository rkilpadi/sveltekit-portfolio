import fs from 'fs/promises';
import path from 'path';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDir = path.resolve(process.cwd(), 'src/routes/projects/posts');
const outputDir = path.resolve(process.cwd(), 'src/lib/posts');

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify);

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(postsDir);

for (const file of files) {
    if (path.extname(file) !== '.md') {
        console.log(`WARNING: ${file} is not a markdown file`);
        continue;
    }

    const markdown = await fs.readFile(path.join(postsDir, file), 'utf-8');

    const html = await processor.process(markdown);

    const js = `export const html = \`${String(html)}\`;`;
    const outputPath = path.join(outputDir, `${path.basename(file, '.md')}.js`);

    await fs.writeFile(outputPath, js);
    console.log(`Processed ${file} -> ${path.basename(outputPath)}`);
}

