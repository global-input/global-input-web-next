import type {MobileData} from '@/lib/global-input-mobile';
import * as microAppsUI from '@/lib/micro-apps/mobile-ui';

export const initDataId = "second-screen-video-selector";


export const fields = {
    title: {
        id: "video-title",
        type: "info",
        value: {
            type: "text",
            content: "",
            style: {
                fontSize: 18,
                marginTop: 20,
            }
        },
        viewId: "row1",
    },
    synopsis: {
        id: "synopsis",
        type: "info",
        value: "",
        viewId: "row1"
    },
    previous: {
        id: "previousVideo",
        label: "Previous Video",
        type: "button",
        icon: "left",
        viewId: "row2"
    },
    next: {
        id: "nextVideo",
        label: "Next Video",
        type: "button",
        icon: "right",
        viewId: "row2",

    },
    play: {
        id: "videoPlayer",
        label: "Play",
        type: "button",
        icon: "select",
        viewId: "row3"
    },backToWebsiteHome:microAppsUI.home////website
};

const titleValue = (title: string) => {
    return { ...fields.title.value, content: title };
}
interface VideoData {
    title: string;
    synopsis: string;
}

export const initData = (videoData: VideoData) => ({
    id: initDataId,
    form: {
        title: "Select Video to Play",
        fields: [
            { ...fields.title, value: titleValue(videoData.title) },
            { ...fields.synopsis, value: videoData.synopsis },
            fields.previous,
            fields.next,
            fields.play
            ,fields.backToWebsiteHome////website
        ]
    }
});


export const sendTitle = (mobile:MobileData, title: string) => {
    mobile.sendValue(fields.title.id, titleValue(title));
};

export const sendSynopsis = (mobile:MobileData, synopsis: string) => {
    mobile.sendValue(fields.synopsis.id, synopsis);
}