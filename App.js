import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { chatGptResponse } from "./src/services/openAI/ChatGPT";

export default function App() {
  const [responseText, setResponseText] = useState("");
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    const message = inputText.trim();
    if (message) {
      setResponseText((prevText) => prevText + "\nUser: " + message + "\n");
      chatGptResponse(message, (newData) => {
        setResponseText((prevText) => prevText + newData);
      });
    }
    setInputText(""); // Limpiar el campo de entrada después de enviar
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Text style={styles.responseText}>{responseText}</Text>
      </ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe algo..."
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
        </View>
        <View style={{ marginHorizontal: 2, justifyContent: "center" }}>
          <Button title="Enviar" onPress={handleSend} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // Asegura que el input y el botón estén al fondo
  },
  scrollView: {
    margin: 10,
  },
  responseText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
