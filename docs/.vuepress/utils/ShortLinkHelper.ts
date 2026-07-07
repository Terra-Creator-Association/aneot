/**
 * 期刊短链跳转规则
 * ================
 * 在构建时（config.ts 加载时同步执行一次）扫描 docs/posts/*，自动生成
 * Cloudflare Pages 静态跳转规则文件 docs/.vuepress/public/_redirects，
 * 随 public/ 目录一并被拷贝进构建产物 dist/，部署后由 Cloudflare Pages
 * 原生识别生效（无需 Functions/Worker）。全程自动推导，新增/修改一期
 * 内容后重新构建即可同步，不需要手动维护任何映射表。
 *
 * 期刊号（Vol）从哪里来：
 * ----------------------
 * 项目里没有结构化的期刊号字段，期刊号只存在于每期目录 README.md 的
 * frontmatter `title` 文本里，形如 `title: "Vol. 30 - 2026 年 06 月号：..."`。
 * 用正则 /Vol\.\s*(\S+)/ 从中提出编号原文（如 "30"、"01"、"SP"），再归一化：
 *   - 纯数字：去掉前导零，如 "01" -> "1"，"30" -> "30"
 *   - "SP"（不分大小写，特刊，历史上唯一一期是 2022-05）：固定映射为 "0"
 *
 * 一级短链 —— 整期跳转：
 * ----------------------
 *   /n/{期刊号}  ->  /posts/{YYYY-MM}/         (301)
 *   例：/n/30    ->  /posts/2026-06/
 *       /n/0     ->  /posts/2022-05/            （SP 特刊）
 *
 * 二级短链 —— 期内单篇文章跳转：
 * ------------------------------
 *   /n/{期刊号}/{文章号}  ->  /posts/{YYYY-MM}/{文件名}.html   (301)
 * 文章号由该期目录下除 README.md 外的每个 .md 文件名推导，规则如下
 * （由项目维护者约定，非源码可推导的隐式规则，故在此详细记录）：
 *   - intro.md            -> 0     （卷首语，固定编号，一期至多一篇）
 *   - articleN.md          -> N     （正常文章，直接沿用文件名里的数字）
 *   - comicN.md             -> c     （漫画；一期内只有一篇漫画时不带数字）
 *                            -> cN   （一期内出现多篇漫画时才带数字，如
 *                                     c1、c2……；目前全站仅 2023-09 一期
 *                                     同时存在 comic1.md + comic2.md）
 *   - paintings.md         -> p     （图，画中秘境，一期至多一篇）
 *   - interview.md          -> i     （访谈，一期至多一篇）
 *   - ope_sec.md            -> o     （干员秘闻，一期至多一篇）
 *   - specialproj.md        -> s     （特别企划，一期至多一篇；目前全站
 *                                     仅 2023-05 出现过一次）
 * 例：/n/20/3  -> /posts/2024-03/article3.html
 *     /n/19/i  -> /posts/2024-02/interview.html
 * 不属于上述任何一类的文件名（未识别的 basename）不生成短链，直接跳过。
 *
 * 缺省兜底：
 * ----------
 *   /n   ->  /posts/    (301)
 *   /n/  ->  /posts/    (301)
 * 即不带期刊号访问 /n 时，跳转到期刊列表页。
 */
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
