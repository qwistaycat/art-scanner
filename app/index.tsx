import { View, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Button 
        title="Camera" 
        onPress={() => router.push('/camera')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});