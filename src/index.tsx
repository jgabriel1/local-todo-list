import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Barlow_500Medium,
  Barlow_600SemiBold,
} from '@expo-google-fonts/barlow';

import AppProvider from './hooks';

import Routes from './routes';

import { DatabaseConnectionProvider } from './data/connection';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    barlow500: Barlow_500Medium,
    barlow600: Barlow_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AppProvider>
        <DatabaseConnectionProvider>
          <Routes />
        </DatabaseConnectionProvider>
      </AppProvider>
    </>
  );
};

export default App;
