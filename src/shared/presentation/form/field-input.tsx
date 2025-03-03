import { View, Text, TextInput } from 'react-native';
import React, { ReactNode } from 'react';
import { Mail, UserRound} from 'lucide-react-native';

type FieldInputProps = {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string
};

const FieldIcons: {[type: string]: ReactNode} = {
  email: <Mail color="#9E9E9E" size={28}/>,
  name: <UserRound color="#9E9E9E" size={28} />,
}

const FieldInput = ({id, label, placeholder, value, onChange, error, type}: FieldInputProps) => {
  return (
    <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
      <Text className="font-urbanist-bold text-[16px] text-white">{label}</Text>
      <View className={`w-full flex flex-row justify-between items-center pb-[10px] border-b-[1px] bg-transparent  ${error ? 'border-b-red-500' : 'border-b-secondary'}`}>
        <TextInput
          id={id}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          className="font-urbanist-bold text-[20px] text-white"
          placeholderClassName="font-urbanist-bold text-[20px] text-[#9E9E9E]"
        />
        {type && FieldIcons[type]}
      </View>
    {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
    </View>
  );
};
export default FieldInput;
