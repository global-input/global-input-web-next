'use client';

import { useEffect, useState } from 'react';

export const useWindowSize = (): [number, number] => {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        // Initial size
        if (typeof window !== 'undefined') {
            updateSize();
        }

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};