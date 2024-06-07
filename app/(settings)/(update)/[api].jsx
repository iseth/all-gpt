import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { defaultStyles } from "../../../constants/Styles";
import Colors from "../../../constants/Colors";
import Icons from "../../../Components/Icons/Icon";
import { PanGestureHandler } from "react-native-gesture-handler";

const UpdateApi = () => {
  const handleGesture = (event) => {
    if (event.nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };
  const navigation = useNavigation();
  const { api } = useLocalSearchParams();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(api);
        if (storedValue !== null) {
          setInputText(storedValue);
        }
      } catch (error) {
        console.log("Error al obtener el valor:", error);
      }
    };

    fetchData();
  }, [api]);

  const handleKeyPress = async () => {
    try {
      await AsyncStorage.setItem(api, inputText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <View className="mt-10 ml-5 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons collection="Entypo" icon="chevron-left" size={20} />
          </TouchableOpacity>
          <View className="mx-2 flex-1 items-center">
            <Text className="text-[17px] font-bold">{api}</Text>
          </View>
          <View className="w-[10%]" />
        </View>
        <View className="border-b-[1px] mx-[16px] mt-[21px] border-gray-300" />
        <View className="mt-[35px]">
          <View>
            <View
              className={`flex-row bg-gray-300 rounded-[5px] mx-[16px] mt-5`}
            >
              <TextInput
                className={`flex-1 mr-2.5 px-4 py-2.5 text-base`}
                placeholder="sk-sUjO..........."
                value={inputText}
                onChangeText={setInputText}
                returnKeyType="done"
                onSubmitEditing={handleKeyPress}
              />
            </View>
          </View>
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default UpdateApi;
