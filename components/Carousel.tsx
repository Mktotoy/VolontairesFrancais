"use client";

import { useState, useRef } from 'react';

interface CarouselProps {
    images: { src: string; alt?: string }[];
}

export default function Carousel({ images }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollTo = (index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const width = container.offsetWidth;
            container.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const width = container.offsetWidth;
            const index = Math.round(container.scrollLeft / width);
            setActiveIndex(index);
        }
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="carousel-container my-8">
            <div
                className="carousel-track"
                ref={scrollContainerRef}
                onScroll={handleScroll}
            >
                {images.map((img, idx) => (
                    <div key={idx} className="carousel-slide">
                        <img
                            src={img.src}
                            alt={img.alt || `Slide ${idx + 1}`}
                            className="carousel-image"
                        />
                    </div>
                ))}
            </div>

            {images.length > 1 && (
                <div className="carousel-dots">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                            onClick={() => scrollTo(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
                .carousel-container {
                    position: relative;
                    width: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #f5f5f5;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                }
                
                .carousel-track {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    width: 100%;
                }
                
                .carousel-track::-webkit-scrollbar {
                    display: none;
                }
                
                .carousel-slide {
                    min-width: 100%;
                    scroll-snap-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #000;
                }
                
                .carousel-image {
                    max-height: 500px;
                    width: auto;
                    max-width: 100%;
                    object-fit: contain;
                }
                
                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px;
                    background: rgba(0,0,0,0.05);
                }
                
                .carousel-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #bbb;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }
                
                .carousel-dot.active {
                    background: var(--primary-color, #007bff);
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
}
