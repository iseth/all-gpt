import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { streamChat } from "./src/services/openAI/ChatGPT";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return; // Previene envío de mensajes vacíos
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText.trim() },
    ]);
    const config = { model: "gpt-3.5-turbo", max_tokens: 60 };

    try {
      await streamChat({
        messages: [{ role: "user", content: inputText }],
        config,
        onChunk: (chunk) => {
          setMessages((prev) => [...prev, { role: "gpt", content: chunk }]);
        },
      });
    } catch (error) {
      console.error("Streaming error:", error);
    }
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {messages.map((message, index) => (
            <View key={index}>
              <Text style={styles.messageLabel}>
                {message.role.toUpperCase()}
              </Text>
              <View
                style={[
                  styles.messageBubble,
                  message.role === "user"
                    ? styles.userMessage
                    : styles.gptMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.role === "user" && styles.userMessageText,
                  ]}
                >
                  {message.content}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            returnKeyType="send"
            // El resto de las props de TextInput irían aquí
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopColor: "#ccc",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "90%",
    alignSelf: "flex-start",
    // backgroundColor: "#efefef",
    marginLeft: 15, // Añadido para la alineación a la izquierda
  },
  userMessage: {
    // backgroundColor: "#007aff", // Color azul de iOS para mensajes del usuario
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0, // Para mensajes del usuario
  },
  gptMessage: {
    // Se pueden remover los estilos si se manejan todos en messageBubble
  },
  messageText: {
    fontSize: 16,
    color: "#000", // Texto negro para mensajes del asistente
  },
  userMessageText: {
    color: "#000", // Texto blanco para mensajes del usuario
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: "#efefef", // Color de fondo para la entrada de texto
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  messageLabel: {
    fontSize: 12,
    color: "#999",
    marginLeft: 15, // Alinea la etiqueta a la izquierda
  },
});

export default App;
