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
  Modal,
} from "react-native";
import { streamChat } from "./src/services/openAI/ChatGPT";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const keyExists = AsyncStorage.getItem("openai");
    if (!keyExists) {
      setIsModalVisible(true);
    }
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages
    const storedApiKey = await AsyncStorage.getItem("openai");
    if (!storedApiKey) {
      setIsModalVisible(true);
      return;
    }
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

  const handleUpdateApiKey = async () => {
    await AsyncStorage.setItem("openai", apiKey);
    setIsModalVisible(false);
    handleSend();
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.modalView}>
            <Text>Please enter your OpenAI API key:</Text>
            <TextInput
              style={styles.modalInput}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="API Key"
            />
            <Button title="Update" onPress={handleUpdateApiKey} />
          </View>
        </Modal>
        <ScrollView
          ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
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
  modalView: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginLeft: 15,
  },
  userMessage: {
    // backgroundColor: "#007aff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  gptMessage: {
    //Styles can be removed if they are all managed in messageBubble
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  userMessageText: {
    color: "#000",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: "#efefef",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  messageLabel: {
    fontSize: 12,
    color: "#999",
    marginLeft: 15,
  },
});

export default App;
