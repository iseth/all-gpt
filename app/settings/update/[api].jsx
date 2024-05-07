import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { defaultStyles } from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

const UpdateApi = () => {
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
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
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
  );
};

export default UpdateApi;
