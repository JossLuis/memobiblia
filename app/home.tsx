import { router } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        router.replace("/login"); // si no hay sesión, vuelve al login
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        {user ? `Hola, ${user.email}` : "Cargando..."}
      </Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}
