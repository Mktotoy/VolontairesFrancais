import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

if (!fs.existsSync(POSTS_DIR)) {
    console.error("Posts directory not found");
    process.exit(1);
}

const files = fs.readdirSync(POSTS_DIR);

files.forEach(file => {
    if (!file.endsWith('.json')) return;

    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(content);

    const mdContent = post.content || '';

    // Remove content from frontmatter
    delete post.content;

    // Parse Dates to be cleaner
    if (post.published_at) {
        // Just keep the string, gray-matter handles it or we parse later
    }

    const fileContent = matter.stringify(mdContent, post);

    const newFilePath = path.join(POSTS_DIR, file.replace('.json', '.md'));
    fs.writeFileSync(newFilePath, fileContent);
    console.log(`Converted ${file} to ${path.basename(newFilePath)}`);
});
