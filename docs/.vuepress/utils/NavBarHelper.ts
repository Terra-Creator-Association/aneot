import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDir = path.resolve(__dirname, '../../posts');

const folders = fs.readdirSync(postsDir).filter((item) => {
    const itemPath = path.join(postsDir, item);
    return fs.statSync(itemPath).isDirectory();
});
folders.sort();

export function getNavBarSource(): string[] {
    return ["", ...folders.slice(-6).map(folder => `${folder}/`)];
}