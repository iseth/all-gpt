import { Link, useNavigation } from "expo-router";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import Icons from "../../Components/Icons/Icon";
import { useState } from "react";

const ApiKeys = () => {
  const navigation = useNavigation();
  const items = [
    { title: "Open AI", api: "openai" },
    { title: "Together", api: "together" },
  ];

  const handleGesture = (event) => {
    if (event.nativeEvent.translationX > 50) {
      navigation.goBack();
    }
  };

  const PressableItem = ({ item, last = 20 }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <Link href={`(settings)/(update)/${item.api}`} asChild>
        <Pressable
          className={`flex-row mb-[${last}px] py-2 rounded-lg justify-between ${
            isPressed ? "bg-gray-300 pl-[12px] pr-[14px] mx-[10px]" : "ml-[22px] mr-[24px]"
          }`}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text className="text-[17px] font-normal">{item.title}</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </Pressable>
      </Link>
    );
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <View className="mt-10 ml-5 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons collection="Entypo" icon="chevron-left" size={20} />
          </TouchableOpacity>
          <View className="mx-2 flex-1 items-center">
            <Text className="text-[17px] font-bold">API Keys</Text>
          </View>
          <View className="w-[10%]" />
        </View>
        <View className="border-b-[1px] mx-[15px] mt-[21px] border-gray-300" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="mt-[35px]">
            <View>
              <View className="ml-[22px] mb-[18px]">
                <Text className="text-[15px] font-bold">Models</Text>
              </View>
              <FlatList
                scrollEnabled={false}
                data={items}
                renderItem={({ item, index }) => (
                  <PressableItem key={index} item={item} />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </PanGestureHandler>
  );
};
export default ApiKeys;
