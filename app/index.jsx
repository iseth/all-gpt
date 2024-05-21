import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { streamChat } from "../Services/openAI/ChatGPT";
import Icons from "../Components/Icons/Icon";
import CardRecomended from "../Components/Generic/CardRecomended";
import { useTheme } from "../Context/ThemeContext";
import InputPrompt from "../Components/Inputs/InputPrompt";
import ButtonAdd from "../Components/Buttons/ButtonAdd";
import { Link } from "expo-router";

import { Messages } from "../Components/Chat";

const Chat = () => {
  const { refresh, setRefresh } = useTheme();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

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
    }
  }, [messages]);

  const handleSend = async () => {
    console.log("handle");
    if (!inputText.trim()) return; // Prevent sending empty messages
    const storedApiKey = await AsyncStorage.getItem("openai");
    if (!storedApiKey) {
      return;
    }
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText.trim() },
    ]);
    const model = await AsyncStorage.getItem("ModelOpenai");
    const config = { model: model ? model : "gpt-3.5-turbo", max_tokens: 200 };

    try {
      await streamChat({
        messages: [{ role: "user", content: inputText }],
        config,
        onChunk: (chunk) => {
          setMessages((prev) => [...prev, { role: "AI", content: chunk }]);
        },
      });
    } catch (error) {
      console.error("Streaming error:", error);
    }
    setInputText("");
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
      <View className={`py-2.5 px-4 items-center`} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={`flex-1`}
        keyboardVerticalOffset={110}
      >
        <View className="h-10 items-start justify-center">
          {/* <Link href="/settings" asChild>
            <TouchableOpacity className="ml-2">
              <Text className="text-5xl">Settings</Text>
            </TouchableOpacity>
          </Link> */}
          {/* <Link href="/Settings" asChild> */}
          {/*   <TouchableOpacity className="ml-2"> */}
          {/*     <Icons icon="settings" size={30} collection="Ionicons" /> */}
          {/*   </TouchableOpacity> */}
          {/* </Link> */}
        </View>

        <Messages messages={messages} scrollViewRef={scrollViewRef} />

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
        <View className={`flex-row my-2 items-center`}>
          <View className="ml-[16px]">
            <ButtonAdd handleOptions={handleSend} />
          </View>
          <View className="flex-1 h-[45px]">
            <InputPrompt
              inputText={inputText}
              setInputText={setInputText}
              collectionIcon="MaterialIcons"
              colorIcon="#6B7280"
              iconName="mic"
              placeholder="Message"
              sizeIcon={25}
              handleSend={handleSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
