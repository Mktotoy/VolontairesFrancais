/**
 * Asset URL helper
 * Centralizes all asset URL generation for scalability
 * As Directus adds more resources, this single function handles all URLs
 * 
 * Uses relative URLs to avoid mixed content errors (HTTPS page + HTTP assets)
 * All asset requests are proxied through the frontend at /assets/*
 */

export function getAssetUrl(assetId?: string | null): string | null {
  if (!assetId) return null;

  // If it's already a full URL or relative path, return it
  if (assetId.startsWith('http') || assetId.startsWith('/')) {
    return assetId;
  }

  // If it looks like a filename (contains a dot), assume it's in assets/posts/ but this is a fallback
  if (assetId.includes('.')) {
    return `/assets/posts/${assetId}`;
  }

  // Fallback or legacy ID handling - for now return null as we moved to local
  return null;
}

/**
 * Extract asset ID from Directus file object
 * Handles both direct IDs and expanded file objects
 */
export function extractAssetId(
  fileData?: string | { id: string } | null
): string | null {
  if (!fileData) return null;

  // If it's a string (direct ID)
  if (typeof fileData === 'string') {
    return fileData;
  }

  // If it's an object with id property (expanded file)
  if (typeof fileData === 'object' && fileData.id) {
    return fileData.id;
  }

  return null;
}
