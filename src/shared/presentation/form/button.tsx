import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  label: string;
  type?: 'primary' | 'secondary';
}

const Button = ({ onPress, label, type = 'primary' }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${type === 'primary' ? 'bg-secondary' : 'bg-quaternary'} rounded-[100px] w-full px-[16px] py-[19px] flex justify-center items-center`}
    >
      <Text className="font-urbanist-bold text-[18px] text-white">{label}</Text>
    </TouchableOpacity>
  );
};
export default Button;
