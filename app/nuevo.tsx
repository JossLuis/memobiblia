import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function NuevoVersiculoScreen() {
  // Estados para los campos de búsqueda
  const [book, setBook] = useState(""); // Ej: "Juan"
  const [chapter, setChapter] = useState(""); // Ej: "3"
  const [verses, setVerses] = useState(""); // Ej: "16" o "16-17"

  // Estados para el resultado y la UI
  const [verseText, setVerseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Lógica para buscar el versículo en la API
  const handleFetchVerse = async () => {
    if (!book || !chapter || !verses) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setLoading(true);
    setVerseText("");

    // Formateamos la referencia para la URL
    const formattedRef = `${book} ${chapter}:${verses}`;

    try {
      // Usamos la API que discutimos (Reina Valera 1960 por defecto)
      const response = await fetch(
        `https://bible-api.deno.dev/api/v1/verses/es/rv1960/${formattedRef}`
      );
      
      if (!response.ok) {
        throw new Error("No se pudo encontrar el versículo. Revisa la referencia.");
      }

      const data = await response.json();
      setVerseText(data.verses[0].text); // Extraemos el texto del versículo
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al buscar.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!verseText) {
      Alert.alert("Texto vacío", "Debes tener un texto para continuar.");
      return;
    }
    // Lógica futura: pasar el verseText a la siguiente pantalla
    Alert.alert("Siguiente Paso", "Aquí pasaríamos a la pantalla de segmentación.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nuevo Versículo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Libro (ej. Juan)"
          value={book}
          onChangeText={setBook}
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Capítulo (ej. 3)"
          value={chapter}
          onChangeText={setChapter}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Versículos (ej. 16)"
          value={verses}
          onChangeText={setVerses}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleFetchVerse}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Buscar Versículo</Text>
        )}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Texto del Versículo:</Text>
      <TextInput
        style={styles.textArea}
        value={verseText}
        onChangeText={setVerseText}
        multiline
        placeholder="El texto del versículo aparecerá aquí... También puedes escribirlo manualmente."
      />

      <TouchableOpacity
        style={[styles.button, styles.continueButton]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2196F3",
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
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top", // Para Android
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    marginTop: 24,
  },
});