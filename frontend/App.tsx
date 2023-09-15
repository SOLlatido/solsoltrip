import { StatusBar } from 'expo-status-bar';
import AppNavigation from './navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigation from './navigation/TabNavigation';
import {
  RecoilRoot,
} from 'recoil';


export default function App() {
  
  return (
      // <GestureHandlerRootView>
    <RecoilRoot>
      <StatusBar style="light"/>
      {/* <TabNavigation></TabNavigation> */}
      <AppNavigation>
      </AppNavigation>
    </RecoilRoot>
      // </GestureHandlerRootView>
  );
}
