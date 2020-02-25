import RNVideoEditor from 'react-native-video-editor';
import CameraRoll, { PhotoIdentifiersPage } from "@react-native-community/cameraroll";
import { Alert } from 'react-native';

class MediaServiceWrapper {

    constructor() {

    }

    public async getLatestContentFromCameraRoll(): Promise<PhotoIdentifiersPage> {
        return new Promise(resolve => {
            CameraRoll.getPhotos({ first: 1 })
                .then(
                    (data: PhotoIdentifiersPage) => resolve(data)
                )
                .catch(
                    error => {
                        Alert.alert(error.message);
                        resolve(undefined);
                    }
                )
        })
    }

    public saveMediaToCameraRoll(uri: string[], type: 'photo' | 'video'): Promise<string> {
        return new Promise(resolve => {
            if (type == 'video') {
                RNVideoEditor.merge(
                    uri,
                    (error: string) => {
                        resolve(undefined)
                        Alert.alert('Error: ' + error);
                    },
                    async (results: any, file: string) => {
                        CameraRoll.saveToCameraRoll(file, 'video')
                            .then(
                                (data: string) => resolve(data)
                            )
                            .catch(
                                (error: { message: string }) => {
                                    Alert.alert(error.message);
                                    resolve(undefined);
                                }
                            )
                    }
                )
            } else {
                CameraRoll.saveToCameraRoll(uri[0], type)
                    .then(
                        (data: string) => resolve(data)
                    )
                    .catch(
                        (error: { message: string }) => {
                            Alert.alert(error.message);
                            resolve(undefined);
                        }
                    )
            }


        })
    }

}

const MediaService = new MediaServiceWrapper();
Object.freeze(MediaService);
export {
    MediaService
}