import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation, useRouter } from "expo-router";

import Colors from "../../constants/Colors";
import Icons from "../../Components/Icons/Icon";

import { useTheme } from "../../Context/ThemeContext";
import { useSQLiteContext } from "expo-sqlite";

const DataControls = () => {
  const db = useSQLiteContext();
  const { setLoadData } = useTheme();

  const navigation = useNavigation();
  const router = useRouter();

  const handleGesture = (event) => {
    if (event.nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  const deleteChat = async () => {
    await db.runAsync("DELETE FROM chat");
    setLoadData(true);
    Alert.alert("chats delete");
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <View className="mt-10 ml-5 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons collection="Entypo" icon="chevron-left" size={20} />
          </TouchableOpacity>
          <View className="w-[10%]" />
        </View>

        <View className="mt-10 ml-[16px]">
          <Text className="text-xl font-bold">Data Controls</Text>
          <TouchableOpacity className="mt-3 flex-row items-center">
            <Icons collection="Ionicons" icon="archive-outline" size={30} />
            <Text className="text-base ml-2">Archive Chat History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteChat}
            className="mt-3 flex-row items-center my-4"
          >
            <Icons
              collection="MaterialCommunityIcons"
              icon="delete-outline"
              size={30}
              color="red"
            />
            <Text className="text-red-600 text-base ml-2">
              Clear Chat History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default DataControls;
