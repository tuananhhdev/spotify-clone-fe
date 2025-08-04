import { useEffect, useState, useCallback } from 'react';

const useDominantColor = (imageUrl: string) => {
    const [dominantColor, setDominantColor] = useState<string>('#1e1e1e');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const extractColor = useCallback(async (url: string) => {
        if (!url) return;

        setIsLoading(true);

        try {
            const ColorThief = (await import('colorthief')).default;

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;

            img.onload = () => {
                try {
                    const colorThief = new ColorThief();
                    const color = colorThief.getColor(img);
                    const [r, g, b] = color;

                    // Điều chỉnh màu để phù hợp với Spotify
                    const hsl = rgbToHsl(r, g, b);
                    hsl[1] = Math.min(60, hsl[1]); // Giảm saturation
                    hsl[2] = Math.max(20, Math.min(35, hsl[2])); // Điều chỉnh lightness

                    // Chuyển HSL về RGB rồi về HEX
                    const adjustedRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                    const hexColor = rgbToHex(adjustedRgb[0], adjustedRgb[1], adjustedRgb[2]);
                    
                    setDominantColor(hexColor);
                } catch (err) {
                    console.warn('Color extraction failed', err);
                    setDominantColor('#2d2d2d');
                } finally {
                    setIsLoading(false);
                }
            };

            img.onerror = () => {
                console.warn('Image failed to load for color extraction');
                setDominantColor('#2d2d2d');
                setIsLoading(false);
            };
        } catch (err) {
            console.error('ColorThief error', err);
            setDominantColor('#2d2d2d');
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        extractColor(imageUrl);
    }, [imageUrl, extractColor]);

    return { dominantColor, isLoading };
};

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 60;
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 1) {
        r = c; g = x; b = 0;
    } else if (1 <= h && h < 2) {
        r = x; g = c; b = 0;
    } else if (2 <= h && h < 3) {
        r = 0; g = c; b = x;
    } else if (3 <= h && h < 4) {
        r = 0; g = x; b = c;
    } else if (4 <= h && h < 5) {
        r = x; g = 0; b = c;
    } else if (5 <= h && h < 6) {
        r = c; g = 0; b = x;
    }
    
    return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
    ];
}

function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export default useDominantColor;