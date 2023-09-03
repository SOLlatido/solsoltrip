import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Intro from './screens/Intro';


export default function App() {
  const navigation = useRouter();
  return (
    <>
      <Intro></Intro>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}