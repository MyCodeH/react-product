import React, { useState, useEffect } from 'react';
import { useRef } from 'react';

function TypingEffect({ text, delay = 100 }) {
    const [displayedText, setDisplayedText] = useState('');
    const timer = useRef(null)

    useEffect(() => {
        if (text) {
            let index = 0;
            const typingEffect = () => {
                if (index < text.length) {
                    setDisplayedText(text.substring(0, index + 1));
                    index++;
                    timer.current = setTimeout(typingEffect, delay);
                }
            };
            typingEffect();
        }
        return () => {
            setDisplayedText('')
            clearTimeout(timer.current)
        }
    }, [text, delay]);
    useEffect(() => {
        setDisplayedText('')
    }, [])

    return <p>{displayedText}</p>;
}

export default TypingEffect;