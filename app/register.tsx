import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebaseConfig";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!firstName.trim()) {
      Alert.alert("⚠️ Campo requerido", "Ingresa tu nombre.");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("⚠️ Campo requerido", "Ingresa tu apellido.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("⚠️ Campo requerido", "Ingresa tu correo electrónico.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("⚠️ Campo requerido", "Ingresa una contraseña.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardamos nombre y apellido en Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      Alert.alert(
        "✅ Registro exitoso",
        "Tu cuenta ha sido creada. Ahora puedes iniciar sesión."
      );

      router.replace("/login");
    } catch (error: any) {
      console.log("❌ Error en registro:", error);

      let mensaje = "Ocurrió un error al registrar. Intenta nuevamente.";

      switch (error.code) {
        case "auth/email-already-in-use":
          mensaje = "El correo electrónico ya está registrado.";
          break;
        case "auth/invalid-email":
          mensaje = "El formato del correo no es válido.";
          break;
        case "auth/weak-password":
          mensaje = "La contraseña es demasiado débil. Usa al menos 6 caracteres.";
          break;
      }

      Alert.alert("❌ Error en registro", mensaje);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Crear Cuenta
      </Text>

      {/* Nombre */}
      <TextInput
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />

      {/* Apellido */}
      <TextInput
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 }}
      />

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

      {/* Botón Registrar */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Registrarse</Text>
      </TouchableOpacity>

      {/* Enlace a Login */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={{ marginTop: 20, color: "blue", textAlign: "center" }}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
}
