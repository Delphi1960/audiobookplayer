import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/Main';
import {RecoilRoot} from 'recoil';
import {Provider as PaperProvider} from 'react-native-paper';
import Bootstrap from './src/Bootstrap';
function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RecoilRoot>
          <PaperProvider>
            <Bootstrap>
              <Main />
            </Bootstrap>
          </PaperProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
