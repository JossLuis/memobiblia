import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); //  trạng thái mới cho lỗi
  const [loading, setLoading] = useState(false); // trạng thái cho tải

  const handleLogin = async () => {
    // Xóa lỗi cũ và bắt đầu tải
    setError("");
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // không cần cảnh báo ở đây, chuyển hướng trực tiếp
      router.replace("/home");
    } catch (err: any) {
      console.log("❌ Lỗi đăng nhập:", err);
      let mensaje = "Ocurrió un error inesperado. Intenta nuevamente.";

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
      setLoading(false); // Dừng tải
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(""); // Xóa lỗi khi người dùng gõ
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[
          styles.input,
          error.includes("correo") && styles.inputError, // Thay đổi viền nếu có lỗi
        ]}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(""); // Xóa lỗi khi người dùng gõ
        }}
        secureTextEntry
        style={[
          styles.input,
          error.includes("contraseña") && styles.inputError, // Thay đổi viền nếu có lỗi
        ]}
      />

      {/* Hiển thị lỗi */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Nút đăng nhập với chỉ báo tải */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// 💅 Thêm StyleSheet để có mã sạch hơn
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
    borderColor: "red", // Viền đỏ cho lỗi
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
  linkText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});