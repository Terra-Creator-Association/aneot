import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDir = path.resolve(__dirname, '../../posts');
const publicDir = path.resolve(__dirname, '../public');

const VOL_PATTERN = /Vol\.\s*(\S+)/;

function normalizeVolId(raw: string): string {
    if (/^\d+$/.test(raw)) return String(parseInt(raw, 10));
    if (raw.toLowerCase() === 'sp') return '0';
    return raw.toLowerCase();
}

export function generateShortLinkRedirects(): void {
    const folders = fs.readdirSync(postsDir).filter((item) => {
        return fs.statSync(path.join(postsDir, item)).isDirectory();
    });
    folders.sort();

    const lines: string[] = [];
    for (const folder of folders) {
        const readmePath = path.join(postsDir, folder, 'README.md');
        if (!fs.existsSync(readmePath)) continue;

        const { data } = matter(fs.readFileSync(readmePath, 'utf-8'));
        const match = typeof data.title === 'string' ? VOL_PATTERN.exec(data.title) : null;
        if (!match) continue;

        const volId = normalizeVolId(match[1]);
        lines.push(`/n/${volId} /posts/${folder}/ 301`);
    }

    fs.writeFileSync(path.join(publicDir, '_redirects'), lines.join('\n') + '\n');
}
