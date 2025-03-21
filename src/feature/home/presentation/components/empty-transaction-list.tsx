import { Text, View } from 'react-native';
import { Ghost } from 'lucide-react-native';

const EmptyTransactionList = ({message, title}:{message?: string, title?: string}) => {
  return (
    <View className="flex items-center justify-center p-6">
      <Ghost size={70} color="white" />
      <Text className="text-white text-lg font-urbanist-medium mt-4">
        {title || 'No Transaction Found'}
      </Text>
      <Text className="text-white text-sm mt-1">
        {message || 'Add income or expense to get started'}
      </Text>
    </View>
  );
};

export default EmptyTransactionList;