'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMobile } from '@/lib/global-input-mobile';
import * as selectorUI from './selectorUI';
import * as playerUI from './playerUI';
import * as mobileUI from '@/lib/micro-apps/mobile-ui';

export * from '@/lib/global-input-mobile';

export enum Mode {
    SELECT_VIDEO,
    PLAY_VIDEO
}

interface VideoPlayerRef {
    current: HTMLVideoElement | null;
}

interface ConnectMobileProps {
    videoPlayer: VideoPlayerRef;
    videoData: any;
    setVideoData: (data: any) => void;
    videoControl: any;
    allowAudio: boolean;
}

const buildInitData = (videoData: any, mode: Mode) => {
    switch (mode) {
        case Mode.PLAY_VIDEO:
            return playerUI.initData(videoData);
        case Mode.SELECT_VIDEO:
        default:
            return selectorUI.initData(videoData);
    }
};

export const useConnectMobile = ({
    videoPlayer,
    videoData,
    setVideoData,
    videoControl,
    allowAudio
}: ConnectMobileProps) => {
    const [configId, setConfigId] = useState(1);
    const [mode, setMode] = useState(Mode.SELECT_VIDEO);
    const router = useRouter();

    const changeMode = (newMode: Mode) => {
        setMode(newMode);
        setConfigId(configId => configId + 1);
    };

    const mobile = useMobile(() => buildInitData(videoData, mode), true, configId);

    const onChangeVideoData = (newVideoData: any) => {
        videoControl.setPlayVideoSource(videoPlayer.current, newVideoData);
        if (mode === Mode.SELECT_VIDEO) {
            selectorUI.sendTitle(mobile, newVideoData.title);
            selectorUI.sendSynopsis(mobile, newVideoData.synopsis);
        }
        setVideoData(newVideoData);
    };

    mobile.setOnchange(({ field }) => {
        if (mode === Mode.SELECT_VIDEO) {
            switch (field.id) {
                case selectorUI.fields.play.id:
                    videoControl.playVideo(videoPlayer.current);
                    changeMode(Mode.PLAY_VIDEO);
                    break;
                case selectorUI.fields.previous.id:
                    onChangeVideoData(videoControl.getPreviousVideo(videoData));
                    break;
                case selectorUI.fields.next.id:
                    onChangeVideoData(videoControl.getNextVideo(videoData));
                    break;
                default:
                    mobileUI.onFieldChange(field, path => router.push(path));
            }
        } else if (mode === Mode.PLAY_VIDEO) {
            switch (field.id) {
                case playerUI.fields.selector.id:
                    changeMode(Mode.SELECT_VIDEO);
                    break;
                case playerUI.fields.slider.id:
                    videoControl.setCurrentTimeWithSlider(videoPlayer.current, field.value);
                    break;
                case playerUI.fields.rw.id:
                    playerUI.sendStatus(mobile, '<<', '');
                    playerUI.sendPauseButton(mobile);
                    videoControl.rewindVideo(videoPlayer.current, () => {
                        playerUI.sendStatus(mobile, 'Paused', 'Rewind complete');
                        playerUI.sendPlayButton(mobile);
                    });
                    break;
                case playerUI.fields.playPause.id:
                    if (field.value) {
                        videoControl.pauseVideo(videoPlayer.current);
                        playerUI.sendPlayButton(mobile);
                    } else {
                        videoControl.playVideo(videoPlayer.current);
                        playerUI.sendPauseButton(mobile);
                    }
                    break;
                case playerUI.fields.mute.id:
                    if (!videoPlayer.current) {
                        break;
                    }
                    if (field.value) {
                        if (!videoPlayer.current.muted) {
                            videoControl.setMuted(videoPlayer.current, true);
                            playerUI.sendUnmuteButton(mobile);
                        }
                    } else {
                        if (videoPlayer.current.muted) {
                            if (allowAudio) {
                                videoControl.setMuted(videoPlayer.current, false);
                                playerUI.sendMuteButton(mobile);
                            } else {
                                playerUI.displayClickOnVideoMessage(mobile);
                            }
                        }
                    }
                    break;
                case playerUI.fields.ff.id:
                    if (videoPlayer.current) {
                        videoControl.fastForwardVideo(videoPlayer.current);
                        const { playbackRate } = videoPlayer.current;
                        playerUI.sendStatus(mobile, '>', `x  ${playbackRate}`);
                        playerUI.sendPauseButton(mobile);
                    }
                    break;
                case playerUI.fields.begin.id:
                    videoControl.pauseVideo(videoPlayer.current);
                    videoControl.skipToBegin(videoPlayer.current);
                    playerUI.sendStatus(mobile, 'Paused', '');
                    playerUI.sendPauseButton(mobile);
                    break;
                case playerUI.fields.end.id:
                    videoControl.pauseVideo(videoPlayer.current);
                    videoControl.skipToEnd(videoPlayer.current);
                    playerUI.sendStatus(mobile, 'Paused', '');
                    playerUI.sendPauseButton(mobile);
                    break;
            }
        }
    });

    return {
        mobile,
        handlers: {
            onPlay: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Playing', '');
                playerUI.sendPauseButton(mobile);
            },
            onPause: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Paused', '');
                playerUI.sendPlayButton(mobile);
            },
            onTimeUpdate: (videoPlayer: VideoPlayerRef) => {
                if (mode !== Mode.PLAY_VIDEO) return;
                const { duration, sliderValue } = videoControl.getVideoPlayerData(videoPlayer.current);
                if (!duration) return;
                if (videoControl.throttleSliderValue(sliderValue)) {
                    playerUI.sendSliderValue(mobile, sliderValue);
                }
            },
            onAbort: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Aborted', '');
                playerUI.sendPlayButton(mobile);
            },
            onEnded: () => {
                videoControl.skipToBegin(videoPlayer.current);
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Completed', '');
                playerUI.sendPlayButton(mobile);
            },
            onError: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Error', 'Something wrong in player');
                playerUI.sendPlayButton(mobile);
            },
            onPlaying: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.sendStatus(mobile, 'Playing', '');
                playerUI.sendPauseButton(mobile);
            },
            audioEnabled: () => {
                if (mode !== Mode.PLAY_VIDEO) return;
                playerUI.clearClickOnVideoMessage(mobile);
            }
        }
    };
};