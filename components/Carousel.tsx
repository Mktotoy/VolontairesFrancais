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

    const scrollPrev = () => {
        if (activeIndex > 0) {
            scrollTo(activeIndex - 1);
        }
    };

    const scrollNext = () => {
        if (activeIndex < images.length - 1) {
            scrollTo(activeIndex + 1);
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

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="nav-btn prev"
                        onClick={scrollPrev}
                        disabled={activeIndex === 0}
                        aria-label="Previous image"
                    >
                        <i className="fas fa-chevron-left" />
                    </button>
                    <button
                        className="nav-btn next"
                        onClick={scrollNext}
                        disabled={activeIndex === images.length - 1}
                        aria-label="Next image"
                    >
                        <i className="fas fa-chevron-right" />
                    </button>
                </>
            )}

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
                    border-radius: 16px;
                    overflow: hidden;
                    background: #f8f9fa;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    aspect-ratio: 16/9;
                    display: flex;
                    flex-direction: column;
                }
                
                .carousel-track {
                    flex: 1;
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    width: 100%;
                    align-items: center;
                }
                
                .carousel-track::-webkit-scrollbar {
                    display: none;
                }
                
                .carousel-slide {
                    min-width: 100%;
                    height: 100%;
                    scroll-snap-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    box-sizing: border-box;
                }
                
                .carousel-image {
                    max-height: 100%;
                    width: auto;
                    max-width: 100%;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                
                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(5px);
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
                
                .carousel-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #dfe6e9;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .carousel-dot.active {
                    background: var(--primary-color, #0056b3);
                    transform: scale(1.3);
                }

                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.8);
                    border: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #2d3436;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    transition: all 0.2s ease;
                    z-index: 10;
                    backdrop-filter: blur(4px);
                }

                .nav-btn:hover:not(:disabled) {
                    background: white;
                    transform: translateY(-50%) scale(1.1);
                    color: var(--primary-color, #0056b3);
                }

                .nav-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .prev { left: 20px; }
                .next { right: 20px; }

                @media (max-width: 768px) {
                    .carousel-container {
                        aspect-ratio: 4/3;
                    }
                    .nav-btn {
                        width: 36px;
                        height: 36px;
                        font-size: 1rem;
                    }
                    .prev { left: 10px; }
                    .next { right: 10px; }
                }
            `}</style>
        </div>
    );
}
