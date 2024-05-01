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
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { streamChat } from "../Services/openAI/ChatGPT";
import Icons from "../Components/Icons/Icon";
import CardRecomended from "../Components/Cards/CardRecomended";
import { useTheme } from "../Context/ThemeContext";
import InputPrompt from "../Components/Inputs/InputPrompt";
import ButtonAdd from "../Components/Buttons/ButtonAdd";

const Chat = () => {
  const { refresh, setRefresh } = useTheme();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const data = [
    { title: "5 cooking tricks", description: "give me 5 cooking tricks" },
    { title: "3 car brands", description: "give me 3 car brands" },
    {
      title: "the numbers from 1 to 10",
      description: "tell me the numbers from 1 to 10",
    },
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
    const model = await AsyncStorage.getItem("ModelOpenai");
    const config = { model: model ? model : "gpt-3.5-turbo", max_tokens: 60 };

    try {
      await streamChat({
        messages: [{ role: "user", content: inputText }],
        config,
        onChunk: (chunk) => {
          setMessages((prev) => [...prev, { content: chunk }]);
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

  useEffect(() => {
    if (refresh) {
      setMessages([]);
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      <View className={`py-2.5 px-4 items-center`}>
        {/* <Text className={`font-bold text-lg`}>Chat</Text> */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={`flex-1`}
        keyboardVerticalOffset={110}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View
            className={`mt-[80px] p-5 bg-slate-100 mx-5 items-center shadow-lg rounded-lg`}
          >
            <Text>Please enter your OpenAI API key:</Text>
            <TextInput
              className={`p-2.5 mt-1.5 rounded-lg border border-gray-200 w-full`}
              value={apiKey}
              onChangeText={setApiKey}
              placeholder="API Key"
            />
            <View className="mt-2">
              <Button title="Update" onPress={handleUpdateApiKey} />
            </View>
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
              <View key={index} className={`ml-3.5`}>
                {message.role && (
                  <Text className={`text-xs`}>
                    {message.role.toUpperCase()}
                  </Text>
                )}
                <View
                  className={`rounded-full max-w-5/6 self-start ${
                    message.role === "user" ? "self-start" : ""
                  }`}
                >
                  <Text className={`text-base text-black`}>
                    {message.content}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Pressable
              onPress={() => setIsModalVisible(true)}
              className="justify-center items-center h-screen"
            >
              <Text>update api key.</Text>
            </Pressable>
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
        <View className={`flex-row`}>
          <ButtonAdd handleOptions={handleSend} />
          <InputPrompt
            inputText={inputText}
            setInputText={setInputText}
            collectionIcon="MaterialIcons"
            colorIcon="#6B7280"
            iconName="mic"
            placeholder="Message"
            sizeIcon={25}
          />
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
