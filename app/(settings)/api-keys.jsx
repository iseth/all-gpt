import { Link, router, useNavigation } from "expo-router";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
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

  const PressableItem = ({ item }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <Link href={`(settings)/(update)/${item.api}`} asChild>
        <Pressable
          className={`flex-row my-2 py-2 rounded-lg ${
            isPressed ? "bg-gray-300" : ""
          }`}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text>{item.title}</Text>
          <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
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
            <Text className="text-xl">Api Keys</Text>
          </View>
          <View className="w-[10%]" />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View>
            <View className="my-2 mx-[16px]">
              <View>
                <Text className="text-xl font-bold">Models</Text>
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
