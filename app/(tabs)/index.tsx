import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige automáticamente a la pantalla de 'home'
  return <Redirect href="/home" />;
}