import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 20,
      }}
    >
      {/* Logo de la app
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 140, height: 140, marginBottom: 20 }}
        resizeMode="contain"
      /> */}

      {/* Nombre de la app */}
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          marginBottom: 40,
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        📖 Memobiblia
      </Text>

      {/* Botón Iniciar Sesión */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#2c3e50",
          paddingVertical: 14,
          paddingHorizontal: 50,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      {/* Botón Registrarse */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={{
          backgroundColor: "#27ae60",
          paddingVertical: 14,
          paddingHorizontal: 50,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}


