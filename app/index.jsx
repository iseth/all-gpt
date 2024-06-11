import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { streamChatOpenAI } from "../Services/openAI/ChatGPT";
import Icons from "../Components/Icons/Icon";
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
  const { refresh, setRefresh, setLoadData, optionModel, setEnableSelect } =
    useTheme();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [allowSend, setAllowSend] = useState(true);
  const [timeComplete, setTimeComplete] = useState(false);
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
          // Suponiendo que chunk es un string que representa un fragmento del mensaje
          if (chunk !== "data: [DONE]") {
            setMessages((prev) => {
              // Encuentra el último mensaje si es de rol "AI" para agregarle el nuevo chunk
              const lastMessageIndex = prev.length - 1;
              if (prev[lastMessageIndex]?.role === "AI") {
                // Agregar el chunk al último mensaje
                const updatedMessage = {
                  ...prev[lastMessageIndex],
                  content: prev[lastMessageIndex].content + chunk,
                };
                // Actualizar el array de mensajes
                return [...prev.slice(0, lastMessageIndex), updatedMessage];
              } else {
                // Si el último mensaje no es de "AI", agrega un nuevo mensaje
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
    setTimeout(() => {
      setTimeComplete(true);
      navigation.setOptions({ headerShown: true });
    }, 20000);
  }, []);

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

            <ScrollView
              className="h-0 max-h-[100px] py-2 mx-1"
              horizontal={true}
            >
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
      ) : (
        <AnimatedIntro />
      )}
    </>
  );
};

export default Chat;
