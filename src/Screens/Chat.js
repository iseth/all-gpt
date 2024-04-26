import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  SafeAreaView,
  StatusBar,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { streamChat } from "../Services/openAI/ChatGPT";
import Icons from "../Components/Icons/Icon";
import CardRecomended from "../Components/Cards/CardRecomended";

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const data = [
    { title: "5 cooking tricks", description: "give me 5 cooking tricks" },
    { title: "3 car brands", description: "give me 3 car brands" },
    { title: "the numbers from 1 to 10", description: "tell me the numbers from 1 to 10" },
  ];
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
    <SafeAreaView className={`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <View className={`py-2.5 px-4 items-center`}>
        {/* <Text className={`font-bold text-lg`}>Chat</Text> */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={`flex-1`}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View className={`mt-12 p-5 bg-white items-center shadow-lg`}>
            <Text>Please enter your OpenAI API key:</Text>
            <TextInput
              className={`p-2.5 mt-1.5 rounded-lg border border-gray-200 w-full`}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="API Key"
            />
            <Button title="Update" onPress={handleUpdateApiKey} />
          </View>
        </Modal>
        <ScrollView
          scrollEnabled={messages.length > 0 ? true : false}
          ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          className={`flex-1`}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <View key={index} className={`mb-1.5 ml-3.5`}>
                <Text className={`text-xs text-gray-400 ml-3.5`}>
                  {message.role.toUpperCase()}
                </Text>
                <View
                  className={`px-2.5 py-2.5 rounded-full my-1.5 max-w-5/6 self-start ${
                    message.role === "user"
                      ? "self-start bg-gray-200"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-base ${
                      message.role === "user" ? "text-black" : "text-black"
                    }`}
                  >
                    {message.content}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View className="justify-center items-center h-screen">
              <Image
                source={require("../../assets/chatgpt.png")}
                className="w-[37px] h-[37px]"
              />
            </View>
          )}
        </ScrollView>
        <ScrollView className="h-0 max-h-[100px] py-2 mx-1" horizontal={true}>
          {data.map((card, index) => (
            <CardRecomended
              key={index}
              title={card.title}
              description={card.description}
              setInputText={setInputText}
            />
          ))}
        </ScrollView>
        <View className={`flex-row p-2.5`}>
          <View className="items-center justify-center mx-1">
            <TouchableOpacity
              className="items-center justify-center rounded-full h-[25px]"
              onPress={handleSend}
            >
              <Icons
                icon="add"
                collection="MaterialIcons"
                size={25}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-1 border border-gray-200 rounded-full">
            <TextInput
              className={`flex-1 mr-2.5 px-4 py-2.5 text-base`}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message"
              returnKeyType="send"
            />
            {inputText.length === 0 && (
              <View className="justify-center mr-4">
                <Icons
                  icon="mic"
                  collection="MaterialIcons"
                  size={25}
                  color="#6B7280"
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            className="items-center justify-center"
            onPress={handleSend}
          >
            {inputText.length > 0 ? (
              <Icons icon="send" collection="Feather" size={25} color="" />
            ) : (
              <Icons
                icon="headset"
                collection="MaterialIcons"
                size={25}
                color=""
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
