'use client';

export const statusValue = (title: string, message: string) => {
    return {
        type: "view",
        style: {},
        content: [{
            type: "text",
            content: title,
            style: {
                fontSize: 18,
                color: "black"
            }
        }, {
            type: "text",
            content: message,
            style: {
                fontSize: 14,
                color: "white"
            }
        }]
    };
};

export const fields = {
    mute: {
        id: "mute-unmute",
        type: "button",
        value: 0,
        options: [
            { value: 0, label: "🔇" }, 
            { value: 1, label: "🔈" }
        ],
    },
    errorMessage: {
        id: "errorMessage",
        type: 'info',
        value: ''
    },
    status: {
        id: "playerStatus",
        type: "info",
        value: statusValue('', ''),
        viewId: "row2"
    },
    slider: {
        id: "currentTimeSlider",
        type: "range",
        value: 0,
        minimumValue: 0,
        maximumValue: 100,
        step: 1,
        viewId: "row3"
    },
    begin: {
        id: "skipToBeginButton",
        type: "button",
        label: "Begin",
        icon: "skip-to-begin",
        viewId: "row4"
    },
    rw: {
        id: "rwButton",
        type: "button",
        label: "RW",
        icon: "rw",
        viewId: "row4"
    },
    ff: {
        id: "ffButton",
        type: "button",
        label: "FF",
        icon: "ff",
        viewId: "row4"
    },
    end: {
        id: "skipToEndButton",
        type: "button",
        label: "End",
        icon: "skip-to-end",
        viewId: "row4"
    },
    selector: {
        id: "videoSelector",
        type: "button",
        label: "Back",
        icon: 'back',
        viewId: "row5"
    },
    playPause: {
        id: "playPauseButton",
        type: "button",
        value: 0,
        label: "Play",
        icon: "play",
        options: [
            { value: 0, label: "Play", icon: "play" }, 
            { value: 1, label: "Pause", icon: "pause" }
        ],
        viewId: "row5"
    },
};

export const initData = (videoData: any) => ({
    id: 'video-player',
    form: {
        views: {
            viewIds: {
                row5: {
                    style: {
                        width: '98%',
                        justifyContent: 'space-between'
                    }
                },
                row4: {
                    style: {
                        width: '98%',
                        justifyContent: 'space-between'
                    }
                }
            }
        },
        title: videoData.title,
        fields: Object.values(fields)
    }
});

export const sendStatus = (mobile: any, title: string, message: string) => {
    mobile.sendValue(fields.status.id, statusValue(title, message));
};

export const sendPlayButton = (mobile: any) => {
    mobile.sendValue(fields.playPause.id, fields.playPause.options[0].value);
};

export const sendPauseButton = (mobile: any) => {
    mobile.sendValue(fields.playPause.id, fields.playPause.options[1].value);
};

export const sendSliderValue = (mobile: any, sliderValue: any) => {
    mobile.sendValue(fields.slider.id, sliderValue);
};

export const sendUnmuteButton = (mobile: any) => {
    mobile.sendValue(fields.mute.id, fields.mute.options[0].value);
};

export const sendMuteButton = (mobile: any) => {
    mobile.sendValue(fields.mute.id, fields.mute.options[1].value);
};

export const displayClickOnVideoMessage = (mobile: any) => {
    mobile.sendValue(fields.errorMessage.id, {
        content: 'Please click on the video to enable audio control',
        style: {
            color: 'red'
        }
    });
};

export const clearClickOnVideoMessage = (mobile: any) => {
    mobile.sendValue(fields.errorMessage.id, '');
};