import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <StatusBar style="auto" />

      <Text>Hello World!</Text>
    </View>
  );
};

export default App;
