/**
 * Export the card canvas element as a PNG download.
 * @param {string} elementId - DOM ID of the canvas container
 * @param {string} [filename] - Output filename
 */
export async function exportCardAsImage(elementId = 'card-canvas', filename = 'eid-card.png') {
    const { default: html2canvas } = await import('html2canvas');

    const element = document.getElementById(elementId);
    if (!element) {
        console.error('[export] Element not found:', elementId);
        return;
    }

    const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2, // 2x resolution for crisp output
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
