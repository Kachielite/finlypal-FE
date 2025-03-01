import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Check } from "lucide-react-native";


type CheckboxProps = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

const Checkbox = ({isChecked, onChange  }: CheckboxProps) => {

  return (
    <Pressable
      onPress={() => onChange(!isChecked)}
      className="flex-row items-center space-x-2"
    >
      <View
        className={`w-[24px] h-[24px] border-2 border-white flex items-center justify-center rounded-lg ${
          isChecked ? "bg-secondary border-secondary" : "bg-transparent"
        }`}
      >
        {isChecked && <Check size={16} color="white" />}
      </View>
    </Pressable>
  );
};
export default Checkbox;
