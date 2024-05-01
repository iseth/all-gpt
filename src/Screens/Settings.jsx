import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icons from "../Components/Icons/Icon";

const Settings = () => {
  return (
    <SafeAreaView className={`flex-1 bg-slate-50`}>
      <ScrollView className="mx-6 my-3 px-2">
        <View>
          <View className="mb-1 ml-3">
            <Text className="text-gray-400">ACCOUNT</Text>
          </View>
          <View className="bg-white pl-4 py-2 rounded-lg">
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="email-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Email</Text>
                <Text className="text-gray-300 pr-2">example@me.com</Text>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="Ionicons"
                  icon="add-circle-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Subscription</Text>
                <Text className="text-gray-300 pr-2">ChatGPT Plus</Text>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="restore"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Restore purchases</Text>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="database-cog-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Data Controls</Text>
                <View className="pr-2">
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons collection="Feather" icon="archive" size={25} />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Archived Chats</Text>
                <View className="pr-2">
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="book-cog-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 pb-1 px-0">
                <Text className="text-black">Custom instructions</Text>
                <View className="pr-2 flex-row">
                  <Text className="text-gray-300">On</Text>
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
          </View>
        </View>
        <View className="my-5">
          <View className="mb-1 ml-3">
            <Text className="text-gray-400">APP</Text>
          </View>
          <View className="bg-white pl-4 py-2 rounded-lg">
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons collection="Feather" icon="sun" size={25} />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Color Scheme</Text>
                <View className="flex-row items-center pr-2">
                  <Text className="text-gray-300 pr-2">System</Text>
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons collection="MaterialIcons" icon="vibration" size={25} />
              </View>
              <View className="flex-row items-center justify-between flex-1 pb-1 px-0">
                <Text className="text-black">Haptic Feedback</Text>
                <View className="pr-2">
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
          </View>
        </View>
        <View className="my-5">
          <View className="mb-1 ml-3">
            <Text className="text-gray-400">SPEECH</Text>
          </View>
          <View className="bg-white pl-4 py-2 rounded-lg">
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialIcons"
                  icon="keyboard-voice"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Voice</Text>
                <View className="flex-row items-center pr-2">
                  <Text className="text-gray-300 pr-2">Sky</Text>
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons collection="Fontisto" icon="world-o" size={25} />
              </View>
              <View className="flex-row items-center justify-between flex-1 pb-1 px-0">
                <Text className="text-black">Main Language</Text>
                <View className="flex-row items-center pr-2">
                  <Text className="text-gray-300 pr-2">Auto-Detect</Text>
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
          </View>
        </View>
        <View className="my-5">
          <View className="mb-1 ml-3">
            <Text className="text-gray-400">ABOUT</Text>
          </View>
          <View className="bg-white pl-4 py-2 rounded-lg">
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons
                  collection="MaterialCommunityIcons"
                  icon="help-circle-outline"
                  size={25}
                />
              </View>
              <View className="flex-row items-center justify-between flex-1 border-b-[1px] pb-1 px-0 border-gray-300">
                <Text className="text-black">Help Center</Text>
                <View className="flex-row items-center pr-2">
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
            {/*item card*/}
            <TouchableOpacity className="flex-row items-center my-2">
              <View className="mr-2">
                <Icons collection="SimpleLineIcons" icon="notebook" size={25} />
              </View>
              <View className="flex-row items-center justify-between flex-1 pb-1 px-0">
                <Text className="text-black">Terms of Use</Text>
                <View className="flex-row items-center pr-2">
                  <Icons
                    collection="Entypo"
                    icon="chevron-right"
                    size={15}
                    color="#D1D5DB"
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/*item card*/}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
