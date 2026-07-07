import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDir = path.resolve(__dirname, '../../posts');
const publicDir = path.resolve(__dirname, '../public');

const VOL_PATTERN = /Vol\.\s*(\S+)/;

// 固定分类文件名 -> 短链字母，无编号（一期内至多一篇）
const ARTICLE_TYPE_LETTER: Record<string, string> = {
    intro: '0',
    paintings: 'p',
    interview: 'i',
    ope_sec: 'o',
    specialproj: 's',
};

function normalizeVolId(raw: string): string {
    if (/^\d+$/.test(raw)) return String(parseInt(raw, 10));
    if (raw.toLowerCase() === 'sp') return '0';
    return raw.toLowerCase();
}

// 正常文章沿用文件名中的编号；漫画只有一篇时用 c，多篇时用 c1、c2……
function getArticleShortId(basename: string, comicCountInFolder: number): string | null {
    if (basename in ARTICLE_TYPE_LETTER) return ARTICLE_TYPE_LETTER[basename];

    const articleMatch = /^article(\d+)$/.exec(basename);
    if (articleMatch) return articleMatch[1];

    const comicMatch = /^comic(\d+)$/.exec(basename);
    if (comicMatch) return comicCountInFolder === 1 ? 'c' : `c${comicMatch[1]}`;

    return null;
}

export function generateShortLinkRedirects(): void {
    const folders = fs.readdirSync(postsDir).filter((item) => {
        return fs.statSync(path.join(postsDir, item)).isDirectory();
    });
    folders.sort();

    const lines: string[] = [];
    for (const folder of folders) {
        const folderPath = path.join(postsDir, folder);
        const readmePath = path.join(folderPath, 'README.md');
        if (!fs.existsSync(readmePath)) continue;

        const { data } = matter(fs.readFileSync(readmePath, 'utf-8'));
        const match = typeof data.title === 'string' ? VOL_PATTERN.exec(data.title) : null;
        if (!match) continue;

        const volId = normalizeVolId(match[1]);
        lines.push(`/n/${volId} /posts/${folder}/ 301`);

        const articleFiles = fs.readdirSync(folderPath).filter((item) => {
            return item.endsWith('.md') && item !== 'README.md';
        });
        const comicCount = articleFiles.filter((item) => /^comic\d+\.md$/.test(item)).length;

        for (const file of articleFiles) {
            const basename = file.slice(0, -'.md'.length);
            const articleId = getArticleShortId(basename, comicCount);
            if (!articleId) continue;

            lines.push(`/n/${volId}/${articleId} /posts/${folder}/${basename}.html 301`);
        }
    }

    lines.push('/n /posts/ 301');
    lines.push('/n/ /posts/ 301');

    fs.writeFileSync(path.join(publicDir, '_redirects'), lines.join('\n') + '\n');
}
