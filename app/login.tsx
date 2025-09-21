import { router } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Inicio de sesión
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("✅ Bienvenido", `Has iniciado sesión como ${email}`);
      router.replace("/home");
    } catch (error: any) {
      console.log("❌ Error de login:", error);

      let mensaje = "Ocurrió un error inesperado. Intenta nuevamente.";

      switch (error.code) {
        case "auth/user-not-found":
          mensaje = "No existe una cuenta con este correo electrónico.";
          break;
        case "auth/wrong-password":
          mensaje = "La contraseña es incorrecta.";
          break;
        case "auth/invalid-email":
          mensaje = "El correo electrónico no tiene un formato válido.";
          break;
        case "auth/invalid-credential":
          mensaje = "Correo o contraseña incorrectos.";
          break;
      }

      Alert.alert("❌ Error al iniciar sesión", mensaje);
    }
  };

  // 🔹 Recuperación de contraseña
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert(
        "⚠️ Ingresa tu correo",
        "Por favor escribe tu correo electrónico para recuperar tu contraseña."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "📩 Revisa tu correo",
        "Te hemos enviado un enlace para restablecer tu contraseña."
      );
    } catch (error: any) {
      console.log("❌ Error en reset:", error);
      Alert.alert("❌ Error", "No pudimos enviar el correo de recuperación.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Iniciar Sesión
      </Text>

      {/* Correo */}
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />

      {/* Contraseña */}
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 6 }}
      />

      {/* Botón Login */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Olvidé mi contraseña */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={{ marginTop: 15, color: "red", textAlign: "center" }}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      {/* Ir a Registro */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ marginTop: 20, color: "blue", textAlign: "center" }}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}
