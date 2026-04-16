import matter from 'gray-matter';

import { Buffer } from 'buffer';
if (globalThis.Buffer === undefined) {
    globalThis.Buffer = Buffer;
}

const postReadmeList = new Map<string, { markdown: string, cover: string }>();

const readmeModules = import.meta.glob('/posts/*/README.md', { query: '?raw', eager: true });
const coverModules = import.meta.glob('/posts/*/res/cover.webp', { eager: true });

for (const [path, content] of Object.entries(readmeModules)) {
    const matchReadme = new RegExp(/\/posts\/([^/]+)\/README\.md$/).exec(path);
    if (matchReadme) {
        const vol = matchReadme[1];
        const coverUri = coverModules[`/posts/${vol}/res/cover.webp`].default as string;

        postReadmeList.set(vol, { markdown: (content.default) as string, cover: coverUri });
    }
}

export function getVolumeInfoGroup(): Array<Array<{ folderName: string, title: string, coverUri: string }>> {
    const volumeInfoList = new Array<Array<{ folderName: string, title: string, coverUri: string }>>();

    let volumeInfoItem = new Array<{ folderName: string, title: string, coverUri: string }>();
    for (const [volumeFolderName, tuple] of postReadmeList) {
        const titleRaw: string = matter(tuple.markdown).data.title;

        const title = `${volumeFolderName}: ${titleRaw.replace("-", "\n")}`;

        if (volumeInfoItem.length === 3) {
            volumeInfoList.push(volumeInfoItem);
            volumeInfoItem = new Array<{ folderName: string, title: string, coverUri: string }>();
        }

        volumeInfoItem.push({ folderName: volumeFolderName, title, coverUri: tuple.cover });
    }

    if (volumeInfoItem.length > 0) {
        volumeInfoList.push(volumeInfoItem);
    }

    return volumeInfoList;
}

export function getLatestVolumeCover(): string {
    const latestFolder = getLatestFolderName();
    const tuple = postReadmeList.get(latestFolder);

    if (!tuple) throw new Error(`README.md not found for volume ${latestFolder}`);

    return tuple.cover;
}

export function getLatestVolumeLink(): string {
    const latestFolder = getLatestFolderName();
    return `/posts/${latestFolder}/`;
}

export function getLatestVolumeTitle(): string {
    const md = getVolumeReadMe(getLatestFolderName());

    const frontmatter = matter(md).data;
    return frontmatter.title;
}

export function getLatestFolderName(): string {

    const folders = Array.from(postReadmeList.keys());

    if (folders.length === 0) throw new Error("No valid folders found in /posts");

    folders.sort();
    folders.reverse();
    const latestFolder = folders[0];

    if (!latestFolder) throw new Error("No valid folders found in /posts");

    return latestFolder;
}

function getVolumeReadMe(vol: string): string {
    const tuple = postReadmeList.get(vol);

    if (!tuple) throw new Error(`README.md not found for volume ${vol}`);

    return tuple.markdown;
}