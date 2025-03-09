import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  label: string;
  type?: 'primary' | 'secondary';
  isLoading?: boolean
}

const Button = ({ onPress, label, isLoading, type = 'primary' }: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      className={`${type === 'primary' ? 'bg-secondary' : 'bg-quaternary'} rounded-[100px] w-full px-[16px] py-[19px] flex justify-center items-center`}
    >
      {isLoading ? <ActivityIndicator size="small" color="white" animating={true} /> :
        <Text className="font-urbanist-bold text-[18px] text-white">{label}</Text>}
    </TouchableOpacity>
  );
};
export default Button;
