import { PermissionsAndroid } from "react-native";


export const requestExternalStoragePermission = async () => {
    if (PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            return granted;
        } catch (err) {
            console.error('Failed to request permission ', err);
            return null;
        }
    }
};

export const requestReadStoragePermission = async () => {
    if (PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            return granted;
        } catch (err) {
            console.error('Failed to request permission ', err);
            return null;
        }
    }
};