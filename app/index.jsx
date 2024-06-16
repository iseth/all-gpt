import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { streamChatOpenAI } from "../Services/openAI/ChatGPT";
import CardRecomended from "../Components/Generic/CardRecomended";
import { useTheme } from "../Context/ThemeContext";
import InputPrompt from "../Components/Inputs/InputPrompt";
import ButtonAdd from "../Components/Buttons/ButtonAdd";
import { useSQLiteContext } from "expo-sqlite";

import { useLocalSearchParams, useNavigation } from "expo-router";

import { Messages } from "../Components/Chat";
import { streamChatTogether } from "../Services/togetherAi/ChatTogether";
import AnimatedIntro from "../Components/Animations/AnimatedIntro";

const Chat = () => {
  const { iden } = useLocalSearchParams();
  const {
    refresh,
    setRefresh,
    setLoadData,
    optionModel,
    setEnableSelect,
    setIdCurrent,
  } = useTheme();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [allowSend, setAllowSend] = useState(true);
  const [timeComplete, setTimeComplete] = useState(null);
  const [id, setId] = useState(null);
  const scrollViewRef = useRef();
  const db = useSQLiteContext();
  const data = [
    { title: "5 cooking tricks", description: "give me 5 cooking tricks" },
    { title: "3 car brands", description: "give me 3 car brands" },
    {
      title: "the numbers from 1 to 10",
      description: "tell me the numbers from 1 to 10",
    },
  ];
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  useEffect(() => {
    const keyExists = AsyncStorage.getItem("openai");
    if (!keyExists) {
    }

    if (id !== null && messages.length > 0) {
      updateData();
      setEnableSelect(true);
    } else {
      setEnableSelect(false);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    const IAs = {
      openai: streamChatOpenAI,
      together: streamChatTogether,
    };
    const storedApiKey = await AsyncStorage.getItem(optionModel.api);
    if (!storedApiKey) {
      Alert.alert(
        `You need to add api key to use the model ${optionModel.title}`,
        `Go to settings to add the api key you must select the model ${optionModel.api}`
      );
      return;
    }
    setAllowSend(false);
    if (messages.length === 0) {
      const result = await db.runAsync(
        "INSERT INTO chat (title, messages,current_model) VALUES (?, ?, ?)",
        `${inputText.trim()}`,
        `${JSON.stringify(messages)}`,
        `${JSON.stringify(optionModel)}`
      );
      setId(result.lastInsertRowId);
      setIdCurrent(result.lastInsertRowId);
      setLoadData(true);
    }
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText.trim() },
    ]);

    // const model = await AsyncStorage.getItem("ModelOpenai");
    const config = {
      model: optionModel ? optionModel.model : "gpt-3.5-turbo",
      max_tokens: 200,
    };
    try {
      await IAs[optionModel.api]({
        messages: [{ role: "user", content: inputText }],
        config,
        onChunk: (chunk) => {
          if (chunk !== "data: [DONE]") {
            setMessages((prev) => {
              const lastMessageIndex = prev.length - 1;
              if (prev[lastMessageIndex]?.role === "AI") {
                const updatedMessage = {
                  ...prev[lastMessageIndex],
                  content: prev[lastMessageIndex].content + chunk,
                };
                return [...prev.slice(0, lastMessageIndex), updatedMessage];
              } else {
                return [...prev, { role: "AI", content: chunk }];
              }
            });
          }
        },
        url: optionModel.url,
      });
      setAllowSend(true);
    } catch (error) {
      console.error("Streaming error:", error);
    }
    setInputText("");
  };

  useEffect(() => {
    if (refresh) {
      setMessages([]);
      setRefresh(false);
      setEnableSelect(false);
    }
  }, [refresh]);

  useEffect(() => {
    setEnableSelect(false);
    initial();
  }, []);

  const initial = async () => {
    const initial = await AsyncStorage.getItem("initial");
    if (!initial) {
      setTimeComplete(false);
      setTimeout(() => {
        setTimeComplete(true);
        AsyncStorage.setItem("initial", "true");
        navigation.setOptions({ headerShown: true });
      }, 2000);
    } else {
      setTimeComplete(true);
      navigation.setOptions({ headerShown: true });
    }
  };

  const updateData = async () => {
    try {
      await db.runAsync("UPDATE chat SET messages = ? WHERE id = ?", [
        JSON.stringify(messages),
        id,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getShowData = async () => {
    const row = await db.getFirstAsync(`SELECT * FROM chat WHERE id=${iden}`);
    setMessages(JSON.parse(row.messages));
  };

  useEffect(() => {
    if (iden !== undefined) {
      setId(iden);
      getShowData();
    } else {
      setId();
      setMessages([]);
    }
  }, [iden]);

  return (
    <>
      {timeComplete ? (
        <SafeAreaView className={`flex-1 bg-white`}>
          <StatusBar barStyle="dark-content" />
          <View className={`py-2.5 px-4 items-center`} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className={`flex-1`}
            keyboardVerticalOffset={110}
          >
            <Messages messages={messages} scrollViewRef={scrollViewRef} />

            <ScrollView
              className="h-0 max-h-[100px] py-2 mx-1"
              horizontal={true}
            >
              {messages.length === 0 &&
                inputText.length === 0 &&
                data.map((card, index) => (
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
                <ButtonAdd handleOptions={() => allowSend && handleSend()} />
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
                  handleSend={() => allowSend && handleSend()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      ) : !timeComplete && timeComplete !== null ? (
        <AnimatedIntro />
      ) : null}
    </>
  );
};

export default Chat;
