import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR  = path.resolve(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'errors.log');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

function formatEntry(level, context, message, error) {
    const timestamp = new Date().toISOString();
    const stack = error?.stack ? `\n  Stack: ${error.stack}` : '';
    return `[${timestamp}] [${level}] [${context}] ${message}${stack}\n`;
}

export function logError(context, message, error) {
    const entry = formatEntry('ERROR', context, message, error);
    console.error(entry.trimEnd());
    fs.appendFileSync(LOG_FILE, entry, 'utf8');
}

export function logWarn(context, message) {
    const entry = formatEntry('WARN', context, message, null);
    console.warn(entry.trimEnd());
}

export function logInfo(context, message) {
    console.log(`[INFO] [${context}] ${message}`);
}
