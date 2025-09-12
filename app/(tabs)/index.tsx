// app/index.tsx
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Index() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Text>Bienvenido 👋 {user.email}</Text>
          <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
        </>
      ) : (
        <Text>No hay usuario autenticado 🔒</Text>
      )}
    </View>
  );
}
