import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Eye, EyeOff, Mail, UserRound } from 'lucide-react-native';

type PasswordFieldInputProps = {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};


const PasswordFieldInput = ({id, label, placeholder, value, onChange, error,}: PasswordFieldInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
      <Text className="font-urbanist-bold text-[16px] text-white">{label}</Text>
      <View className={`w-full flex flex-row justify-between items-center pb-[10px] border-b-[1px] bg-transparent  ${error ? 'border-b-red-500' : 'border-b-secondary'}`}>
        <TextInput
          id={id}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          className="font-urbanist-bold text-[20px] text-white"
          placeholderClassName="font-urbanist-bold text-[20px] text-[#9E9E9E]"
        />
        <TouchableOpacity onPress={() => setShowPassword(!setShowPassword)}>
          {showPassword ? <EyeOff color="#9E9E9E" size={28}/> : <Eye color="#9E9E9E" size={28}/>}
        </TouchableOpacity>
      </View>
    {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
    </View>
  );
};
export default PasswordFieldInput;
