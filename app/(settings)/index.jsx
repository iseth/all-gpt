import { Link, useNavigation, useRouter } from "expo-router";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";

import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";

import Icons from "../../Components/Icons/Icon";
import { useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

const Settings = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleGesture = (event) => {
    if (event.nativeEvent.translationX > 50) {
      router.navigate("/");
    }
  };
  // Create a function component for a Pressable Item
  const PressableItem = ({ href, iconCollection, iconName, text }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <Link href={href} asChild>
        <Pressable
          className={`flex-row my-2 py-2 rounded-lg ${
            isPressed ? "bg-gray-300" : ""
          }`}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <View className="mr-2">
            <Icons collection={iconCollection} icon={iconName} size={20} />
          </View>
          <Text>{text}</Text>
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
            <Text className="text-xl">Settings</Text>
          </View>
          <View className="w-[10%]" />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="mt-[20px]">
            <View className="my-2 ml-[16px]">
              <View>
                <Text className="text-xl font-bold">Models</Text>
              </View>
              <PressableItem
                href="(settings)/api-keys"
                iconCollection="MaterialIcons"
                iconName="key"
                text="Api Keys"
              />
            </View>
            <View className="border-b-[1px] mx-[6px] border-gray-300" />
            <View className="my-2 ml-[16px]">
              <View>
                <Text className="text-xl font-bold">App</Text>
              </View>
              <PressableItem
                href="(settings)/api-keys"
                iconCollection="MaterialIcons"
                iconName="dark-mode"
                text="Color Scheme"
              />
              <PressableItem
                href="(settings)/api-keys"
                iconCollection="MaterialIcons"
                iconName="vibration"
                text="Haptic FeedBack"
              />
              <PressableItem
                href="(settings)/DataControls"
                iconCollection="MaterialCommunityIcons"
                iconName="database-outline"
                text="Data Controls"
              />
            </View>
            <View className="border-b-[1px] mx-[6px] border-gray-300" />

            <View className="my-2 ml-[16px]">
              <View>
                <Text className="text-xl font-bold">About</Text>
              </View>
              <PressableItem
                href="(settings)/api-keys"
                iconCollection="MaterialIcons"
                iconName="help-outline"
                text="Terms of use"
              />
              <PressableItem
                href="(settings)/api-keys"
                iconCollection="SimpleLineIcons"
                iconName="lock"
                text="Privacy Policy"
              />
            </View>
          </View>
        </ScrollView>
        <View className="my-2 ml-[16px]">
          <View className="flex-row items-center justify-center">
            <View>
              <Icons icon={"circle"} collection={"Entypo"} />
            </View>
            <View className="mx-2">
              <Text>Version for IOS 1.444</Text>
            </View>
          </View>
        </View>
      </View>
    </PanGestureHandler>
  );
};
export default Settings;
