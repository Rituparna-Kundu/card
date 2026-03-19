/**
 * Export the card canvas element as a PNG download using html-to-image.
 * This library preserves SVG contents, CSS filters (drop-shadow), inset box-shadows, and fonts much better.
 * @param {string} elementId - DOM ID of the canvas container
 * @param {string} [filename] - Output filename
 */
export async function exportCardAsImage(elementId = 'card-canvas', filename = 'eid-card.png') {
    const { toPng } = await import('html-to-image');

    const element = document.getElementById(elementId);
    if (!element) {
        console.error('[export] Element not found:', elementId);
        return;
    }

    // Wait for all fonts to be loaded before capturing
    if (document.fonts) {
        await document.fonts.ready;
    }

    // Optional: wait a tiny bit to ensure Google Fonts and background images are painted.
    await new Promise(r => setTimeout(r, 200));

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2, // 2x resolution for crisp output
            skipAutoScale: false,
            // Provide explicit dimensions to avoid flexbox collapse bugs in html-to-image
            width: 400,
            height: 560,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left',
                // Force absolute dimensions during export to override mobile responsive CSS
                width: '400px',
                height: '560px',
                left: '0',
                top: '0',
                margin: '0',
                padding: '0',
                // Ensure correct relative layout context for absolute elements inside
                position: 'relative',
            }
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('[export] Failed to export card:', err);
    }
}
