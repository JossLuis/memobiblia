import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({}); // Trạng thái lỗi dưới dạng đối tượng
  const [loading, setLoading] = useState(false);

  // 🚦 Logic để xác thực tất cả các trường
  const validateFields = () => {
    const newErrors: any = {};
    if (!firstName.trim()) newErrors.firstName = "Ingresa tu nombre.";
    if (!lastName.trim()) newErrors.lastName = "Ingresa tu apellido.";
    if (!email.trim()) newErrors.email = "Ingresa tu correo.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Correo no válido.";
    if (!password.trim()) newErrors.password = "Ingresa una contraseña.";
    else if (password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleRegister = async () => {
    if (!validateFields()) return; // Dừng lại nếu xác thực thất bại
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { firstName, lastName, email });

      Alert.alert(
        "✅ Registro exitoso",
        "Tu cuenta ha sido creada. Ahora puedes iniciar sesión."
      );

      router.replace("/login");
    } catch (error: any) {
      console.log("❌ Lỗi đăng ký:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "El correo electrónico ya está registrado." });
      } else {
        Alert.alert("❌ Error", "Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          if (errors.firstName) setErrors({ ...errors, firstName: null });
        }}
        style={[styles.input, errors.firstName && styles.inputError]}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          if (errors.lastName) setErrors({ ...errors, lastName: null });
        }}
        style={[styles.input, errors.lastName && styles.inputError]}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: null });
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, errors.email && styles.inputError]}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: null });
        }}
        secureTextEntry
        style={[styles.input, errors.password && styles.inputError]}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
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
    marginBottom: 4, // Giảm khoảng cách để lỗi gần hơn
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10, // Khoảng cách dưới lỗi
    marginLeft: 4,
    fontSize: 12,
  },
  linkText: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});