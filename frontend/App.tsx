import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AppNavigation from './navigation/AppNavigation';


export default function App() {
  return (
    <>
      <AppNavigation></AppNavigation>
    </>
  );
}