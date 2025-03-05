import { Text, TextInput, View } from 'react-native';
import { forwardRef } from 'react';
import { Mail, UserRound } from 'lucide-react-native';

type FieldInputProps = {
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  value: string;
  onChangeText: (text: string) => void;
};

const FieldIcons: { [key: string]: JSX.Element } = {
  email: <Mail color="#9E9E9E" size={28} />,
  name: <UserRound color="#9E9E9E" size={28} />,
};

const FieldInput = forwardRef<TextInput, FieldInputProps>(
  ({ label, placeholder, error, type, value, onChangeText, ...rest }, ref) => {
    return (
      <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
        <Text className="font-urbanist-bold text-[16px] text-white">{label}</Text>
        <View
          className={`w-full flex flex-row justify-between items-center pb-[10px] border-b-[1px] bg-transparent  
          ${error ? "border-b-red-500" : "border-b-secondary"}`}
        >
          <TextInput
            ref={ref}
            placeholder={placeholder}
            className="font-urbanist-bold text-[20px] text-white w-[90%]"
            placeholderClassName="font-urbanist-bold text-[20px] text-[#9E9E9E]"
            value={value}  // Ensure it is controlled
            onChangeText={onChangeText} // Handle text input updates
            {...rest}
          />
          {type && FieldIcons[type]}
        </View>
        {error && <Text className="font-urbanist-regular text-[12px] text-red-500">{error}</Text>}
      </View>
    );
  }
);

export default FieldInput;