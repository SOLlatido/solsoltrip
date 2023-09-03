import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Intro from './screens/Intro';
import EndTimeReset from './screens/EndTimeReset';


export default function App() {
  const navigation = useRouter();
  return (
    <>
      <EndTimeReset></EndTimeReset>
      <StatusBar style="auto" />
    </>
  );
}