import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react-native';

type PasswordFieldInputProps = {
  label: string;
  placeholder: string;
  error?: string;
  value: string;
  onChangeText: (text: string) => void;
};

const PasswordFieldInput = forwardRef<TextInput, PasswordFieldInputProps>(
  ({ label, placeholder, error, value, onChangeText, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
        <Text className="font-urbanist-bold text-[16px] text-white">{label}</Text>
        <View
          className={`w-full flex flex-row justify-between items-center pb-[10px] border-b-[1px] bg-transparent  
          ${error ? "border-b-red-500" : "border-b-secondary"}`}
        >
          <TextInput
            ref={ref}
            secureTextEntry={!showPassword}
            placeholder={placeholder}
            className="font-urbanist-bold text-[20px] text-white w-[90%]"
            placeholderClassName="font-urbanist-bold text-[20px] text-[#9E9E9E]"
            value={value} // Ensure controlled behavior
            onChangeText={onChangeText} // Handle text input updates
            {...rest}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOff color="#9E9E9E" size={28} /> : <Eye color="#9E9E9E" size={28} />}
          </TouchableOpacity>
        </View>
        {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
      </View>
    );
  }
);

export default PasswordFieldInput;