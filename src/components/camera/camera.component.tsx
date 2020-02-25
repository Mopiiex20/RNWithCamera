import React, { Component } from 'react'
import { RNCamera } from 'react-native-camera'
import { View, TouchableOpacity, Text, PermissionsAndroid, Image, Alert } from 'react-native'
import { styles } from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Carousel from 'react-native-snap-carousel';
import { Subscription, timer } from 'rxjs';
import { tap, takeWhile } from 'rxjs/operators';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import { requestReadStoragePermission } from '../../shared/helpers/android.permissions';
import Video from 'react-native-video';

import { VideoState } from '../../shared/enums/video-type.enum';
import { MediaService } from '../../services/media.service';
import { PhotoIdentifiersPage } from '@react-native-community/cameraroll';

interface State {
    cameraType: 'front' | 'back',
    cameraMode: 'photo' | 'video',
    isCameraModeChanging: boolean,
    videoStatus: keyof typeof VideoState,
    previewImage: {
        uri: string,
        type: 'photo' | 'video'
    },
    recordedVideoUrls: string[]
    previewOpen: boolean,
    pausedTime: number,
    timerStart: number
}

class RNCameraComponent extends Component<any, State> {

    subscription: Subscription;
    counter: number = -1;

    constructor(props) {
        super(props)
        this.state = {
            cameraType: 'back',
            cameraMode: 'photo',
            isCameraModeChanging: false,
            videoStatus: VideoState.STOP,
            previewImage: {
                uri: undefined,
                type: 'photo'
            },
            pausedTime: 0,
            timerStart: 0,
            previewOpen: false,
            recordedVideoUrls: []
        }
    }

    camera: RNCamera = undefined;
    player: Video = undefined;
    _carousel: any = undefined;
    entries: string[] = ['Photo', 'Video'];
    time: number = 0;

    setInitialPreviewImage = async () => {
        const permission = await requestReadStoragePermission();
        if (permission) {
            const data: PhotoIdentifiersPage = await MediaService.getLatestContentFromCameraRoll();
            if (data) {
                this.setState({ previewImage: { uri: data.edges[0].node.image.uri, type: data.edges[0].node.type.includes('image') ? 'photo' : 'video' } })
            }
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ alignSelf: 'center', padding: 10, }} onPress={() => this.snapToItem(index)}>
                <Text style={{ color: this._carousel.currentIndex !== index ? 'white' : 'blue' }} >{item}</Text>
            </TouchableOpacity>
        );
    }

    changeCameraType = () => {
        this.setState({
            cameraType: this.state.cameraType === 'front' ? 'back' : 'front'
        })
    }

    takePicture = async () => {
        if (this.camera) {
            await this.requestExternalStoragePermission();
            const options = { quality: 0.5, base64: true };
            this.camera.takePictureAsync(options).then(
                async data => {
                    const photo: string = await MediaService.saveMediaToCameraRoll([data.uri], 'photo');
                    if (photo) {
                        this.setInitialPreviewImage()
                    }
                }
            )
        }
    };

    startRecording = async () => {
        if (this.camera) {
            if (this.state.videoStatus !== VideoState.START) {
                this.setState({ videoStatus: VideoState.START })
                await this.requestExternalStoragePermission();
                this.camera.recordAsync().then(
                    data => {
                        this.setState({ recordedVideoUrls: [...this.state.recordedVideoUrls, data.uri] })
                        if (this.state.videoStatus === VideoState.STOP) {
                            this.saveVideo()
                        }
                    }
                )
            }
        }
    }

    pauseRecording = () => {
        this.setState({ videoStatus: VideoState.PAUSE, pausedTime: (Date.now() - this.time) })
        this.camera.stopRecording();
    }

    stopRecording = () => {
        this.setState({ videoStatus: VideoState.STOP, pausedTime: 0 })
        this.counter = -1;
        this.time = 0;
        this.camera.stopRecording();
    }

    async saveVideo() {
        const video = await MediaService.saveMediaToCameraRoll(this.state.recordedVideoUrls, 'video')
        if (video) {
            this.setInitialPreviewImage();
        }
        this.setState({ recordedVideoUrls: [] })
    }

    requestExternalStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            return granted;
        } catch (err) {
            console.error('Failed to request permission ', err);
            return null;
        }
    };

    onSwipePreview() {
        this.setState({ previewOpen: false })
    }

    swipeLeft() {
        this.setState({ isCameraModeChanging: true })
        this.camera.pausePreview()
        setTimeout(() => {
            this._carousel.snapToNext();
        }, 250);
    }

    swipeRight() {
        this.setState({ isCameraModeChanging: true })
        this.camera.pausePreview();
        setTimeout(() => {
            this._carousel.snapToPrev();
        }, 250);
    }

    snapToItem(index) {
        this.camera.pausePreview();
        this.setState({ isCameraModeChanging: true })
        setTimeout(() => {
            this._carousel.snapToItem(index);
        }, 500);
    }

    onSnapToItem(slideIndex) {
        this.camera.resumePreview();
        this.setState({
            cameraMode: slideIndex == 1 ? 'video' : 'photo',
            isCameraModeChanging: false
        })
    }

    setTime() {
        this.setState({ timerStart: Date.now() })
    }

    render() {
        if (this.state.videoStatus === VideoState.START) {
            this.time = Date.now()
            this.subscription = timer(0, 1000)
                .pipe(
                    takeWhile(() => this.state.videoStatus == VideoState.START),
                    tap(() => this.counter = Date.now())
                )
                .subscribe(() => {
                    const displayedTime = moment().seconds(0).millisecond(0).minutes(0);
                    this.props.navigation.setOptions({ title: `${displayedTime.milliseconds((this.counter - this.time) + this.state.pausedTime).format('mm:ss')}`, headerTitleAlign: 'center' })
                });
        } else {
            if (this.state.videoStatus === VideoState.STOP) {
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
                this.props.navigation.setOptions({ title: `Camera`, headerTitleAlign: 'left' })
            }
        }

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            this.state.previewOpen ?
                <GestureRecognizer
                    onSwipeDown={this.onSwipePreview.bind(this)}
                    style={styles.previewContainer}>
                    {this.state.previewImage.type === 'photo' ?
                        <Image source={{ uri: this.state.previewImage.uri }} style={styles.previewFullScreen}></Image>
                        :
                        <Video source={{ uri: this.state.previewImage.uri }}
                            ref={(ref) => {
                                this.player = ref
                            }}
                            poster={this.state.previewImage.uri}
                            controls={true}
                            paused={true}
                            style={styles.backgroundVideo} />
                    }
                </GestureRecognizer>
                :
                <View style={styles.container}>
                    <GestureRecognizer
                        style={{ flex: 1 }}
                        onSwipeLeft={this.swipeLeft.bind(this)}
                        onSwipeRight={this.swipeRight.bind(this)}
                        config={config}
                    >
                        <View style={[styles.swipePanel, this.state.isCameraModeChanging ? { backgroundColor: 'rgba(255,255,255,0.7)' } : null]}></View>
                        <RNCamera
                            style={styles.preview}
                            ref={ref => {
                                this.camera = ref;
                            }}
                            type={this.state.cameraType}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            onStatusChange={e => {
                                if (e.cameraStatus === 'READY' && e.recordAudioPermissionStatus === 'AUTHORIZED') {
                                    this.setInitialPreviewImage()
                                }
                            }}
                        >
                        </RNCamera>
                    </GestureRecognizer>
                    <View style={{ backgroundColor: 'black' }}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.entries}
                            firstItem={0}
                            renderItem={this._renderItem}
                            sliderWidth={350}
                            itemWidth={100}
                            enableSnap={true}
                            onSnapToItem={(index) => this.onSnapToItem(index)}
                        />
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.inputPreview} onPress={() => this.setState({ previewOpen: true })}>
                            <Image source={{ uri: this.state.previewImage.uri }} style={styles.inputPreview}></Image>
                            {this.state.previewImage.type === 'video' ?
                                <Icon name='play-circle' color={'black'} size={10} style={styles.previewVideo}></Icon>
                                :
                                null
                            }
                        </TouchableOpacity>
                        {this.state.cameraMode == 'photo' ?
                            <Icon name='camera' size={40} onPress={this.takePicture.bind(this)} style={styles.capturePhoto}>
                            </Icon>
                            :
                            this.state.videoStatus === VideoState.START ?
                                <Icon name='pause-circle' size={50} onPress={this.pauseRecording.bind(this)} style={styles.capturePhoto}></Icon>
                                : <Icon name='play-circle' size={50} onPress={this.startRecording.bind(this)} style={styles.capturePhoto}></Icon>
                        }
                        {this.state.videoStatus !== VideoState.STOP ?
                            <Icon name='stop-circle' size={40} onPress={this.stopRecording.bind(this)} style={styles.stopVideo}></Icon>
                            : null}
                        <Icon onPress={this.changeCameraType} name='sync' size={20} style={styles.switchType}></Icon>
                    </View>
                </View>
        )
    }
}

export default RNCameraComponent