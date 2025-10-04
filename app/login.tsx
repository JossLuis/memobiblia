import { router } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 🟢 Nuevo estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async () => {
    // Limpiar ambos mensajes al iniciar una acción
    setError("");
    setSuccessMessage("");
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (err: any) {
      let mensaje = "Ocurrió un error inesperado.";
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          mensaje = "El correo electrónico o la contraseña son incorrectos.";
          break;
        case "auth/invalid-email":
          mensaje = "El correo electrónico no tiene un formato válido.";
          break;
      }
      setError(mensaje);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    // Limpiar ambos mensajes
    setError("");
    setSuccessMessage("");
    if (!email) {
      setError("Por favor, ingresa tu correo para restablecer la contraseña.");
      return;
    }
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      // ✅ Establecer el mensaje de éxito en lugar de la alerta
      setSuccessMessage(
        `Recibirás un correo en ${email} para restablecer tu contraseña.`
      );
    } catch (error: any) {
      setError("No pudimos enviar el correo. Verifica que esté bien escrito.");
      console.log("❌ Error en reset:", error);
    } finally {
      setResetLoading(false);
    }
  };

  // Función para limpiar mensajes cuando el usuario escribe
  const handleTextChange = (setter: Function, value: string) => {
    setter(value);
    setError("");
    setSuccessMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => handleTextChange(setEmail, text)}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[
          styles.input,
          error.toLowerCase().includes("correo") && styles.inputError,
        ]}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => handleTextChange(setPassword, text)}
        secureTextEntry
        style={[
          styles.input,
          error.toLowerCase().includes("contraseña") && styles.inputError,
        ]}
      />

      {/* Renderizado condicional de mensajes */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={loginLoading || resetLoading}
      >
        {loginLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleForgotPassword}
        disabled={loginLoading || resetLoading}
        style={styles.forgotPasswordButton}
      >
        {resetLoading ? (
          <ActivityIndicator color="#4A90E2" />
        ) : (
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        disabled={loginLoading || resetLoading}
      >
        <Text style={styles.linkText}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
  },
  // 🎨 Nuevo estilo para el mensaje de éxito
  successText: {
    color: "green",
    textAlign: "center",
    marginBottom: 12,
  },
  forgotPasswordButton: {
    marginTop: 15,
    padding: 5,
  },
  forgotPasswordText: {
    color: "#4A90E2",
    textAlign: "center",
    fontSize: 14,
  },
  linkText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});