import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  previewContainer: {
    flex: 1
  },
  preview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  previewFullScreen: {
    flex: 1
  },
  previewVideo: {
    position: 'absolute',
    right: -2,
    bottom: -2
  },
  actionButtons: {
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  capturePhoto: {
  },
  stopVideo: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: 'auto',
    top: 10,
    right: 90,

  },
  inputPreview: {
    borderRadius: 50,
    width: 40,
    height: 40
  },
  previewImage: {
    width: 100,
    height: 100
  },
  stopRecord: {

  },
  switchType: {
    marginRight: 20
    // flex: 0,|F
  },
  swipePanel: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.0)',
    left: 0,
    top: 0,
    width: 500,
    height: 560,
    zIndex: 1,
  }

});