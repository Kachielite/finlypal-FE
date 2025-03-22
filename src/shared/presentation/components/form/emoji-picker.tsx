import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, View } from 'react-native';
import EmojiModal from 'react-native-emoji-modal';

const EmojiPickerInput = ({
                            onChangeText,
                            value,
                            label,
                            error,
                          }: {
  onChangeText: (text: string) => void;
  label: string;
  value: string;
  error?: string;
}) => {
  const [showPicker, setShowPicker] = useState(false);



  return (
    <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
      <Text className="font-urbanist-bold text-[16px] text-white">{label}</Text>
      <Pressable
        onPress={() => setShowPicker(true)}
        className={`w-full h-[100px] flex flex-row justify-center items-center pb-[10px] border-[1px] bg-transparent rounded-lg self-center
          ${error ? "border-red-500" : "border-secondary"}`}
      >
        {!value?
          <Text className="font-urbanist-bold text-[16px] text-white text-center self-center">
            "Select an emoji"
          </Text>
          :
          <Text className="font-urbanist-bold text-[75px] text-white text-center self-center">
            {value}
          </Text>
        }
      </Pressable>

      {/* Modal for Emoji Picker */}
      <Modal visible={showPicker} transparent={true} animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View style={{
            height: 360,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          }}>
            <EmojiModal
              onEmojiSelected={(emoji) => {
                onChangeText(emoji as string);
                setShowPicker(false);
              }}
              containerStyle={{width: "100%", height: "100%", backgroundColor: "#102632"}}
              emojiSize={54}
              columns={6}
              modalStyle={{height: "100%", width: "100%", backgroundColor: "#102632"}}
              headerStyle={{color: "#fff", backgroundColor: "#102632"}}
              onPressOutside={() => setShowPicker(false)}
              activeShortcutColor="#17CE92"
              backgroundStyle={{height: "100%", width: "100%"}}
            />
          </View>
        </View>
        </KeyboardAvoidingView>
      </Modal>

      {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
    </View>
  );
};

export default EmojiPickerInput;