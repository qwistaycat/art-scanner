import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showModelOverlay, setShowModelOverlay] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo?.uri);
        setPhotoUri(photo?.uri || null);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const retakePicture = () => {
    setPhotoUri(null);
    setShowModelOverlay(false);
  };

  const confirmPicture = () => {
    // Handle photo confirmation here (save, navigate, etc.)
    console.log('Photo confirmed:', photoUri);
    setShowModelOverlay(true);
  };

  const addModelOverlay = () => {
    // Empty function for now - functionality to be added later
    console.log('Add Model Overlay pressed');
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show photo preview if photo was taken
  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        
        {!showModelOverlay ? (
          <View style={styles.previewControls}>
            <TouchableOpacity 
              style={styles.retakeButton} 
              onPress={retakePicture}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={confirmPicture}
            >
              <Text style={styles.buttonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.previewControls}>
            <TouchableOpacity 
              style={styles.modelOverlayButton} 
              onPress={addModelOverlay}
            >
              <Text style={styles.buttonText}>+ Model Overlay</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.controls}>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraFacing}
          >
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
          >
            <Text style={styles.buttonText}>Snap</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#00000099',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 20,
  },
  flipButton: {
    backgroundColor: '#ffffff88',
    padding: 10,
    borderRadius: 8,
  },
  captureButton: {
    backgroundColor: '#ffffff88',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  permissionButton: {
    backgroundColor: '#ffffff88',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  preview: {
    flex: 1,
    marginTop: 60,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  retakeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#44ff44',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  modelOverlayButton: {
    backgroundColor: '#4488ff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
});