import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

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
        <Text className="font-urbanist-bold text-[75px] text-white text-center self-center">{value || "Select an emoji"} </Text>
      </Pressable>

      {/* Modal for Emoji Picker */}
      <Modal visible={showPicker} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View style={{
            height: 500,
            backgroundColor: "#1e1e1e", // Dark background
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          }}>
            <EmojiSelector showHistory onEmojiSelected={(emoji) => {
              onChangeText(emoji);
              setShowPicker(false);
            }} />
          </View>
        </View>
      </Modal>

      {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
    </View>
  );
};

export default EmojiPickerInput;