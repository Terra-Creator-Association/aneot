<template>
    <template v-if="type == 'latest-title'">
        <p class="centering" style="font-size: larger;">
            <strong>{{ volumeFolderName }}: {{ volumeTitle }}</strong>
        </p>
    </template>
    <template v-else-if="type == 'latest-cover'">
        <div class="cover-container">
            <img :src="volumeCover" alt="封面图像">
        </div>
    </template>
    <template v-else-if="type == 'latest-link'">
        <a class="route-link" :href="volumeLink">
            <strong>在线阅读</strong>
        </a>
    </template>
    <template v-else-if="type == 'volumes'">
        <table>
            <tbody>
                <template v-for="(group, groupIndex) in volumeGroup" :key="groupIndex">
                    <tr>
                        <td v-for="item in group" :key="item.folderName">
                            <img :src="item.coverUri" />
                        </td>
                    </tr>
                    <tr>
                        <td v-for="item in group" :key="item.folderName" style="text-align:center;">
                            <a style="white-space: pre-wrap;" class="route-link" :href="`/posts/${item.folderName}/`">{{
                                item.title }}</a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </template>
</template>

<style scoped>
.cover-container {
    display: flex;
    justify-content: center;
}

.cover-container img {
    max-width: 60%;
}
</style>

<script>
import { getLatestFolderName, getLatestVolumeCover, getLatestVolumeLink, getLatestVolumeTitle, getVolumeInfoGroup } from '../utils/VolumeHelper'

export default {
    name: "LatestVolumeTitle",
    data() {
        return { volumeTitle: getLatestVolumeTitle(), volumeCover: getLatestVolumeCover(), volumeFolderName: getLatestFolderName(), volumeLink: getLatestVolumeLink(), volumeGroup: getVolumeInfoGroup() };
    }
}
</script>

<script setup>
defineProps({
    type: String
})
</script>