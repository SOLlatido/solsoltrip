import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AppNavigation from './navigation/AppNavigation';

import {
  RecoilRoot,
} from 'recoil';


export default function App() {
  return (
    <RecoilRoot>
      <AppNavigation></AppNavigation>
    </RecoilRoot>
  );
}
