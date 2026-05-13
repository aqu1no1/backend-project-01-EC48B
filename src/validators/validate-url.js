export function validateUrl(url) {
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            throw new Error();
        }
    } catch {
        throw new Error(`URL inválida: "${url}"`);
    }
}