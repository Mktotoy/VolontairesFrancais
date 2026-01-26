"use client";

import React, { useMemo } from 'react';
import Carousel from './Carousel';

interface ArticleBodyProps {
    contentHtml: string;
}

export default function ArticleBody({ contentHtml }: ArticleBodyProps) {
    const renderedContent = useMemo(() => {
        // Regex to match img tags. 
        // Handles standard <img src="..." alt="..." /> attributes.
        // We capture the whole tag.
        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;

        // Split content by images? No, we need to group them.
        // Use a more parser-like approach.

        const parts = [];
        let lastIndex = 0;
        let match;

        // We need to find sequences of images.
        // This simple regex iteration finds all images.
        // To find *sequences*, we need to check if the text BETWEEN matches is only whitespace/newlines.

        const images: { src: string; alt: string; index: number; fullTag: string }[] = [];

        while ((match = imgRegex.exec(contentHtml)) !== null) {
            // Extract alt if present
            const altMatch = match[0].match(/alt="([^"]*)"/);
            const alt = altMatch ? altMatch[1] : '';

            images.push({
                src: match[1],
                alt,
                index: match.index,
                fullTag: match[0]
            });
        }

        if (images.length === 0) {
            return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />;
        }

        let currentImageGroup: { src: string; alt: string }[] = [];
        let contentStart = 0;

        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const prevImg = images[i - 1];

            // If first image, or checks against previous
            let isAdjacent = false;
            if (prevImg) {
                const textBetween = contentHtml.slice(prevImg.index + prevImg.fullTag.length, img.index);
                // Check if textBetween is only whitespace or <p></p> or <br> tags
                // This is a heuristic.
                const cleanText = textBetween.replace(/<p>|<\/p>|<br\s*\/?>|\s/g, '');
                if (cleanText === '') {
                    isAdjacent = true;
                }
            }

            if (isAdjacent) {
                currentImageGroup.push({ src: img.src, alt: img.alt });
            } else {
                // Flush previous group
                if (currentImageGroup.length > 0) {
                    // If it was just 1 image, treating it as a carousel might be overkill, 
                    // but for consistency let's stick to the rule: "Carousel if multiple"?
                    // The user said "Possible den faire carrousel si beaucoupo dimages ?" (if many images)

                    if (currentImageGroup.length > 1) {
                        // It's a group!
                        // Push content before the group
                        // The start of the group was... we need to track that.
                        // This loop logic is getting tricky. Let's simplify.
                    }
                }
                // Reset
                currentImageGroup = [{ src: img.src, alt: img.alt }];
            }
        }

        // Re-do loop with explicit group identification first
        const groups: { images: typeof images, startIndex: number, endIndex: number }[] = [];

        if (images.length > 0) {
            let currentGroup = [images[0]];

            for (let i = 1; i < images.length; i++) {
                const img = images[i];
                const prev = images[i - 1];
                const textBetween = contentHtml.slice(prev.index + prev.fullTag.length, img.index);
                const cleanText = textBetween.replace(/<p>|<\/p>|<br\s*\/?>|\s/g, '');

                if (cleanText === '') {
                    currentGroup.push(img);
                } else {
                    groups.push({
                        images: currentGroup,
                        startIndex: currentGroup[0].index,
                        endIndex: currentGroup[currentGroup.length - 1].index + currentGroup[currentGroup.length - 1].fullTag.length
                    });
                    currentGroup = [img];
                }
            }
            // Push last
            groups.push({
                images: currentGroup,
                startIndex: currentGroup[0].index,
                endIndex: currentGroup[currentGroup.length - 1].index + currentGroup[currentGroup.length - 1].fullTag.length
            });
        }

        // Now reconstruct content
        const finalNodes = [];
        let cursor = 0;

        groups.forEach((group, idx) => {
            // Text before group
            // We need to be careful. The "text between" inside a group matches whitespace/tags we want to ignore.
            // But we need to grab the text before the group start.

            // Wait, the "cleanText" check essentially ignores headers/paragraphs that wrap the images?
            // e.g. <p><img1/></p> <p><img2/></p>
            // textBetween is `</p> <p>` -> cleanText is empty -> Adjacent!
            // So we should effectively replace the entire range from Start of Img1 to End of Img2, 
            // BUT we might leave dangling <p> tags if we are not careful?
            // e.g. `<p>Start content</p><p><img1/></p>`
            // Image 1 index starts at <img...
            // So we preserve `<p>Start content</p><p>`? 
            // That leaves an open `<p>` tag?

            // This regex parsing on raw HTML string is dangerous for validity.
            // However, for a designated "ArticleBody" where images are usually block level elements in markdown...

            // Safer strategy for "Visual" carousel:
            // If we replace `<img>...<img>` with `<Carousel>`, we might break the HTML structure if they are inside different block tags.
            // But usually editors put them in paragraphs.

            if (group.images.length > 1) {
                // It is a carousel candidate
                // We add the text before the first image
                const textBefore = contentHtml.slice(cursor, group.startIndex);
                if (textBefore) {
                    // We need to close any open tags? No, React dangerouslySetInnerHTML acts as a block usually.
                    // If textBefore ends with `<p>`, we are fine.
                    finalNodes.push(<div key={`text-${idx}`} dangerouslySetInnerHTML={{ __html: textBefore }} />);
                }

                finalNodes.push(<Carousel key={`carousel-${idx}`} images={group.images.map(i => ({ src: i.src, alt: i.alt }))} />);

                cursor = group.endIndex;

                // If the images were wrapped in `<p>...</p>`, those tags are now "cut" in the middle?
                // No, `startIndex` is the start of `<img`.
                // So `<p>` is in `textBefore`. 
                // We rendered `textBefore` in a div. Browser will auto-close the `p`?
                // `dangerouslySetInnerHTML` renders HTML. If it is `<p>foo`, browser closes it at end of div.
                // So we are mostly safe visually.
            } else {
                // Single image, just leave it as text
                // We do nothing, let the loop continue?
                // Actually we can just NOT emit a carousel, and let the cursor catch up later?
                // But we iterate groups.
                const textIncludingImg = contentHtml.slice(cursor, group.endIndex);
                finalNodes.push(<div key={`text-${idx}`} dangerouslySetInnerHTML={{ __html: textIncludingImg }} />);
                cursor = group.endIndex;
            }
        });

        // Tail
        if (cursor < contentHtml.length) {
            finalNodes.push(<div key="tail" dangerouslySetInnerHTML={{ __html: contentHtml.slice(cursor) }} />);
        }

        return finalNodes;
    }, [contentHtml]);

    return (
        <div className="article-body-parsed">
            {renderedContent}
        </div>
    );
}
