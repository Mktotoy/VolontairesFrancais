import { NextRequest, NextResponse } from 'next/server';
import { listPhotos, uploadPhoto, listFolders } from '@/lib/storage';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || undefined;
    const mode = searchParams.get('mode'); // 'folders' or 'photos'

    try {
        if (mode === 'folders') {
            const folders = await listFolders();
            return NextResponse.json(folders);
        }

        const photos = await listPhotos(folder);
        return NextResponse.json(photos);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve storage data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string || '').trim();

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Sanitize filename: strip path traversal sequences, keep only safe characters
        const rawName = file.name.replace(/\.\.[/\\]/g, '').replace(/[/\\]/g, '');
        const safeName = rawName.replace(/[^a-zA-Z0-9.\-_()\s]/g, '_');

        if (!safeName || safeName.startsWith('.')) {
            return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
        }

        // Sanitize folder name
        const safeFolder = folder
            ? folder.replace(/\.\./g, '').replace(/[/\\]/g, '').trim()
            : '';

        const storageName = safeFolder ? `${safeFolder}/${safeName}` : safeName;

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadPhoto(storageName, buffer);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 });
    }
}
