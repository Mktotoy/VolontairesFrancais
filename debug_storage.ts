import { listFolders, listPhotos } from './lib/storage';

async function run() {
    console.log('--- Folders ---');
    const folders = await listFolders();
    console.log(JSON.stringify(folders, null, 2));

    console.log('\n--- Photos in "Cortina" ---');
    const photos = await listPhotos('Cortina');
    console.log(JSON.stringify(photos, null, 2));
    
    console.log('\n--- Photos in "cortina" (lowercase) ---');
    const photosLower = await listPhotos('cortina');
    console.log(JSON.stringify(photosLower, null, 2));
}

run().catch(console.error);
