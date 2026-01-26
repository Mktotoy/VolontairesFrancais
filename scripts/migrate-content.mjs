import { createDirectus, rest, readItems } from '@directus/sdk';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import https from 'node:https';

const DIRECTUS_URL = 'https://admin.volontairesfrancais.fr';
const client = createDirectus(DIRECTUS_URL).with(rest());

async function downloadImage(assetId, folder) {
    if (!assetId) return null;

    // Handle if assetId is an object
    const id = typeof assetId === 'object' ? assetId.id : assetId;
    if (!id) return null;

    const imageUrl = `${DIRECTUS_URL}/assets/${id}`;
    const targetDir = path.join(process.cwd(), 'public/assets', folder);
    const targetFile = path.join(targetDir, `${id}.jpg`); // Assuming jpg or we can detect mime type later if strict, but simplifying for now.
    const relativePath = `/assets/${folder}/${id}.jpg`;

    // Check if exists
    try {
        await fs.access(targetFile);
        return relativePath; // Already downloaded
    } catch {
        // Continue to download
    }

    console.log(`Downloading ${imageUrl} to ${targetFile}...`);

    return new Promise((resolve, reject) => {
        https.get(imageUrl, (response) => {
            if (response.statusCode !== 200) {
                console.error(`Failed to download ${imageUrl}: ${response.statusCode}`);
                resolve(null);
                return;
            }

            const fileStream = createWriteStream(targetFile);
            pipeline(response, fileStream)
                .then(() => resolve(relativePath))
                .catch((err) => {
                    console.error(`Error saving ${targetFile}:`, err);
                    resolve(null);
                });
        }).on('error', (err) => {
            console.error(`Error fetching ${imageUrl}:`, err);
            resolve(null);
        });
    });
}

async function migratePosts() {
    console.log('Migrating Posts...');
    const items = await client.request(readItems('posts', {
        limit: -1,
        fields: ['*.*']
    }));

    for (const item of items) {
        if (item.featured_picture) {
            item.featured_picture = await downloadImage(item.featured_picture, 'posts');
        }
    }

    await fs.writeFile('content/posts.json', JSON.stringify(items, null, 2));
    console.log(`Saved ${items.length} posts.`);
}

async function migrateTeam() {
    console.log('Migrating Team...');
    const items = await client.request(readItems('team_members', {
        limit: -1,
        fields: ['*.*']
    }));

    for (const item of items) {
        if (item.image) {
            item.image = await downloadImage(item.image, 'team');
        }
    }

    await fs.writeFile('content/team.json', JSON.stringify(items, null, 2));
    console.log(`Saved ${items.length} team members.`);
}

async function migratePress() {
    console.log('Migrating Press Articles...');
    const items = await client.request(readItems('press_articles', {
        limit: -1,
        fields: ['*.*']
    }));

    for (const item of items) {
        if (item.image) {
            item.image = await downloadImage(item.image, 'press');
        }
    }

    await fs.writeFile('content/press.json', JSON.stringify(items, null, 2));
    console.log(`Saved ${items.length} press articles.`);
}

async function migrateFaq() {
    console.log('Migrating FAQ...');
    const items = await client.request(readItems('faq', {
        limit: -1,
        fields: ['*.*']
    }));

    // FAQ usually doesn't have images but let's be safe if they add one later, 
    // but schema didn't show one. Just save.
    await fs.writeFile('content/faq.json', JSON.stringify(items, null, 2));
    console.log(`Saved ${items.length} FAQ items.`);
}

async function main() {
    try {
        await migratePosts();
        await migrateTeam();
        await migratePress();
        await migrateFaq();
        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

main();
