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

    // Optional: wait a tiny bit to ensure Google Fonts and background images are painted.
    await new Promise(r => setTimeout(r, 200));

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2, // 2x resolution for crisp output
            skipAutoScale: false,
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('[export] Failed to export card:', err);
    }
}
