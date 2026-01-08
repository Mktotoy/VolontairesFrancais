"use client";

import { useState } from 'react';

interface FaqItemProps {
    number: number;
    question: string;
    answer: string;
}

export default function FaqItem({ number, question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button
                className="faq-question"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="faq-number">{number}</span>
                <span className="faq-text">{question}</span>
                <i className={`fas fa-chevron-down faq-icon ${isOpen ? 'rotate' : ''}`}></i>
            </button>
            <div
                className="faq-answer"
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div dangerouslySetInnerHTML={{ __html: answer }} />
            </div>
        </div>
    );
}
