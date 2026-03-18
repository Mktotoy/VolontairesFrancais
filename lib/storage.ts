import { Client, StorageObject } from '@replit/object-storage';
import { Readable } from 'stream';

const client = new Client();
const PREFIX = 'pictures/';

export interface PhotoMetadata {
    name: string;
    path: string;
    url: string;
    relativeName: string;
}

/**
 * List photos in the 'pictures/' folder, optionally filtered by a sub-folder.
 */
export async function listPhotos(folder?: string): Promise<PhotoMetadata[]> {
    const { ok, value, error } = await client.list();

    if (!ok) {
        console.error('Error listing photos:', error.message);
        return [];
    }

    // Normalize input folder for comparison
    const normalizedFolder = folder?.trim();

    // Filter by prefix and ensure it's not a "folder" placeholder (if any)
    return value
        .filter((obj: StorageObject) => {
            if (!obj.name.startsWith(PREFIX) || obj.name.endsWith('/')) return false;

            if (!normalizedFolder) return true;

            const relativePath = obj.name.replace(PREFIX, '');
            const parts = relativePath.split('/');
            if (parts.length < 2) return false;

            // Compare the first part (folder name) trimmed
            return parts[0].trim() === normalizedFolder;
        })
        .map((obj: StorageObject) => {
            const relativePath = obj.name.replace(PREFIX, '');
            // Encode each segment but keep slashes as segments for [...slug]
            const urlPath = relativePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
            return {
                name: relativePath.split('/').pop() || relativePath,
                path: obj.name,
                url: `/api/photos/${urlPath}`,
                relativeName: relativePath,
            };
        });
}

/**
 * List all unique "folders" (first-level subdirectories) under 'pictures/', 
 * including a preview image URL for each.
 */
export async function listFolders(): Promise<{ name: string; previewUrl: string | null }[]> {
    const { ok, value, error } = await client.list();
    if (!ok) {
        console.error('Error listing folders:', error.message);
        return [];
    }

    const folderMap = new Map<string, string | null>();
    value.forEach((obj: StorageObject) => {
        if (obj.name.startsWith(PREFIX)) {
            const relativePath = obj.name.replace(PREFIX, '');
            const parts = relativePath.split('/');
            if (parts.length > 1) {
                const rawFolderName = parts[0];
                const folderName = rawFolderName.trim();
                // Skip suspicious folder names (path traversal attempts)
                if (folderName.includes('..') || folderName.includes('/') || folderName.includes('\\')) return;
                const fileName = parts[1];

                if (!folderMap.has(folderName)) {
                    folderMap.set(folderName, null);
                }

                // If this is an image and we don't have a preview yet, use it
                // We use the rawFolderName for the URL to ensure it matches the actual storage path
                if (fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName) && !folderMap.get(folderName)) {
                    folderMap.set(folderName, `/api/photos/${encodeURIComponent(rawFolderName)}/${encodeURIComponent(fileName)}`);
                }
            }
        }
    });

    return Array.from(folderMap.entries()).map(([name, previewUrl]) => ({
        name,
        previewUrl
    })).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Upload a photo to the 'pictures/' folder.
 */
export async function uploadPhoto(filename: string, data: Buffer | string | Readable) {
    const path = `${PREFIX}${filename}`;

    if (data instanceof Buffer) {
        const result = await client.uploadFromBytes(path, data);
        if (!result.ok) {
            throw new Error(result.error.message);
        }
    } else if (typeof data === 'string') {
        const result = await client.uploadFromText(path, data);
        if (!result.ok) {
            throw new Error(result.error.message);
        }
    } else {
        await client.uploadFromStream(path, data as Readable);
    }

    return { name: filename, path };
}

/**
 * Delete a photo from the 'pictures/' folder.
 */
export async function deletePhoto(filename: string) {
    const path = `${PREFIX}${filename}`;
    const { ok, error } = await client.delete(path);
    if (!ok) {
        console.error(`Error deleting photo ${filename}:`, error.message);
        throw new Error(error.message);
    }
    return true;
}

/**
 * Download a photo as a stream of bytes.
 */
export async function getPhotoStream(filename: string): Promise<Readable> {
    const path = `${PREFIX}${filename}`;
    return client.downloadAsStream(path);
}
