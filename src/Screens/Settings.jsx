import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "../Components/Icons/Icon";

const Settings = () => {
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [togetherApiKey, setTogetherApiKey] = useState("");

  const [openaiShowButton, setOpenaiShowButton] = useState(false);
  const [togetherShowButton, setTogetherShowButton] = useState(false);

  useEffect(() => {
    const loadApiKeys = async () => {
      try {
        const openaiValue = await AsyncStorage.getItem("openai");
        const togetherValue = await AsyncStorage.getItem("together");
        setOpenaiApiKey(openaiValue || "");
        setTogetherApiKey(togetherValue || "");
      } catch (error) {
        console.error("Error loading API keys from AsyncStorage:", error);
      }
    };

    loadApiKeys();
  }, []);

  const handleOpenaiInputChange = (text) => {
    setOpenaiApiKey(text);
    setOpenaiShowButton(true);
  };

  const handleOpenaiBlur = () => {
    setOpenaiShowButton(false);
  };

  const handleTogetherInputChange = (text) => {
    setTogetherApiKey(text);
    setTogetherShowButton(true);
  };

  const handleTogetherBlur = () => {
    setTogetherShowButton(false);
  };

  const handlePaste = () => {
    setOpenaiShowButton(true);
    setTogetherShowButton(true);
  };

  const handleSave = async () => {
    try {
      console.log(openaiApiKey);
      await AsyncStorage.setItem("together", togetherApiKey);
      setOpenaiShowButton(false);
      setTogetherShowButton(false);
    } catch (error) {
      console.error("Error saving API keys to AsyncStorage:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="mx-6 my-3 px-2">
        <View>
          <View className="mb-1 ml-3">
            <Text className="text-gray-400">SERVICES</Text>
          </View>
          <View className="bg-white pl-4 py-2 rounded-lg">
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="email-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                {openaiApiKey.trim().length > 0 && (
                  <TouchableOpacity
                    className="mx-2 py-1 px-2"
                    onPress={handleSave}
                  >
                    <Icons size={20} collection={"AntDesign"} icon={"save"} />
                  </TouchableOpacity>
                )}
                <Text className="text-black mx-2">Openai</Text>
                <ScrollView horizontal={true} style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Your API KEY"
                    onChangeText={handleOpenaiInputChange}
                    onBlur={handleOpenaiBlur}
                    onPaste={handlePaste}
                    value={openaiApiKey}
                  />
                </ScrollView>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="email-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                {togetherApiKey.trim().length > 0 && (
                  <TouchableOpacity
                    className="mx-2 py-1 px-2"
                    onPress={handleSave}
                  >
                    <Icons size={20} collection={"AntDesign"} icon={"save"} />
                  </TouchableOpacity>
                )}
                <Text className="text-black mx-2">Together</Text>
                <ScrollView horizontal={true} style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Your API KEY"
                    onChangeText={handleTogetherInputChange}
                    onBlur={handleTogetherBlur}
                    onPaste={handlePaste}
                    value={togetherApiKey}
                  />
                </ScrollView>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
