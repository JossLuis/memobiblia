import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../AuthContext"; // Importamos nuestro hook

export default function Home() {
  const { userName, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // --- Contenido estático para la demostración ---
  const demoTitle = "Juan 3:16";
  const demoVerseSegments = [
    "Porque de tal manera amó Dios al mundo,",
    "que ha dado a su Hijo unigénito,",
    "para que todo aquel que en él cree,",
    "no se pierda, mas tenga vida eterna.",
  ];
  // ---------------------------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>
        {userName ? `Bienvenido, ${userName} 👋` : "Cargando..."}
      </Text>
      <Text style={styles.subtitle}>
        Así funciona una flashcard en MemoBiblia:
      </Text>

      {/* --- Componente Visual de la Flashcard --- */}
      <View style={styles.flashcardContainer}>
        {/* Título del Versículo */}
        <View style={styles.titleCard}>
          <Text style={styles.titleText}>{demoTitle}</Text>
        </View>

        {/* Segmentos del Versículo */}
        <View style={styles.segmentsGrid}>
          {demoVerseSegments.map((segment, index) => (
            <View key={index} style={styles.segmentCard}>
              <Text style={styles.segmentText}>{segment}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* ----------------------------------------- */}

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Estilos para la página y las flashcards ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Un fondo suave
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  flashcardContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  titleCard: {
    padding: 15,
    backgroundColor: "#e3f2fd", // Un azul claro para el título
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  segmentsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  segmentCard: {
    width: "48%", // Aprox. la mitad del contenedor para 2 columnas
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 100, // Altura mínima para que se vea bien
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  segmentText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});