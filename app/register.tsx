import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("⚠️ Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Registro exitoso", "Tu cuenta ha sido creada");
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("❌ Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 20 }}>
        Crea tu cuenta
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

      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 15,
          padding: 10,
          borderRadius: 8,
        }}
        secureTextEntry
      />

      <Button title="Registrar" onPress={handleRegister} />

      <Text
        style={{ marginTop: 20, textAlign: "center", color: "blue" }}
        onPress={() => router.push("/login")}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}
