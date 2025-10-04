import { Stack, router, usePathname } from "expo-router"; // 👈 Importa usePathname
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../AuthContext"; // Asegúrate que la ruta sea correcta

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const { user, loading } = useAuth();
  const pathname = usePathname(); // 👈 Usamos el hook usePathname

  useEffect(() => {
    if (loading) return;

    // Comprobamos si la ruta actual es una de las de autenticación
    const inAuthPages = pathname === "/login" || pathname === "/register";

    if (!user && !inAuthPages) {
      // Si no hay usuario y no estamos en login/register, redirigimos
      router.replace("/login");
    } else if (user && inAuthPages) {
      // Si hay usuario y está en login/register, lo mandamos a home
      router.replace("/home");
    }
  }, [user, loading, pathname]); // 👈 El efecto ahora depende del pathname

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Las pantallas se renderizan aquí según la ruta */}
    </Stack>
  );
}