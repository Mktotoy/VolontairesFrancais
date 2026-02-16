import { NextRequest, NextResponse } from 'next/server';
import { getPhotoStream, deletePhoto } from '@/lib/storage';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const filename = slug.join('/');
    
    try {
        const stream = await getPhotoStream(filename);
        
        if (!stream) {
            return new NextResponse('Photo not found', { status: 404 });
        }

        // Determine content type based on extension
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        else if (ext === 'gif') contentType = 'image/gif';
        else if (ext === 'webp') contentType = 'image/webp';

        return new NextResponse(stream as any, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Stream error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const filename = slug.join('/');

    try {
        await deletePhoto(filename);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
    }
}
