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
            <Icons collection="AntDesign" icon="arrowleft" size={20} />
          </TouchableOpacity>
          <View className="mx-2">
            <Text className="text-xl">{api}</Text>
          </View>
        </View>
        <View>
          <View>
            <View
              className={`flex-row border border-gray-200 bg-white rounded-lg mx-2 mt-3`}
            >
              <TextInput
                className={`flex-1 mr-2.5 px-4 py-2.5 text-base`}
                placeholder="Enter API Key"
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
