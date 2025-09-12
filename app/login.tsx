import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("❌ Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>
        Inicia Sesión
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 15,
          padding: 10,
          borderRadius: 8,
        }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 15,
          padding: 10,
          borderRadius: 8,
        }}
        secureTextEntry
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <Text
        style={{ marginTop: 20, textAlign: "center", color: "blue" }}
        onPress={() => router.push("/register")}
      >
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

