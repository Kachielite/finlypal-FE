import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export type SelectInputData = {
  id: number;
  label: string;
  value: string;
};


type SelectInputProps = {
  label: string;
  placeholder: string;
  error?: string;
  value: SelectInputData | null;
  onChangeText: (selectedData: SelectInputData | null) => void;
  data: SelectInputData[];
  icon?: React.ReactNode;
};

const SelectInput = ({ label, placeholder, error, value, onChangeText, data, icon }: SelectInputProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SelectInputData | null>(null);
  

  return (
    <View className="w-full flex flex-col justify-start items-start gap-y-4">
      {/* Label */}
      <Text className="font-urbanist-bold text-lg text-white">{label}</Text>

      {/* Pressable Wrapper to Open Modal */}
      <Pressable
        onPress={() => {
          // setSelectedValue(data.find(item => item.value === value)); // Keep previous value when opening
          setModalVisible(true);
        }}
        className={`w-full flex flex-row justify-between items-center border-b pb-2 bg-transparent ${
          error ? 'border-b-red-500' : 'border-b-secondary'
        }`}
      >
        <Text className={`${value ? 'text-white' : 'text-[#9E9E9E]'} text-[20px] font-urbanist-bold`}>{value ? value.label : placeholder}</Text>
        {icon}
      </Pressable>

      {/* Modal for Bottom Sheet Picker */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-[#1E2A32] p-4 rounded-t-lg w-full">
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => {
                onChangeText(selectedValue); // Update value only when "Done" is clicked
                setModalVisible(false);
              }}
              className="mb-2 self-end"
            >
              <Text className="text-secondary font-urbanist-bold text-[18px]">Done</Text>
            </TouchableOpacity>

            {/* Picker (Selection Updates Without Closing Modal) */}
            <Picker
              itemStyle={{ color: 'white', fontSize: 18, fontWeight: "bold", backgroundColor: '#1E2A32' }}
              dropdownIconColor="white"
              selectedValue={selectedValue?.value} // Use the value for comparison
              onValueChange={(itemValue) => {
                const selectedItem = data.find(item => item.value === itemValue) || null;
                setSelectedValue(selectedItem); // Store the full object
              }}
              mode="dropdown"
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                backgroundColor: '#1E2A32',
              }}
            >
              <Picker.Item label={placeholder} value="" color="white" style={{ fontSize: 16, fontWeight: "bold", backgroundColor: '#1E2A32' }} />
              {data.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} style={{ color: 'white', fontSize: 18, fontWeight: "bold", backgroundColor: '#1E2A32' }} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Error Message */}
      {error && <Text className="font-urbanist-regular text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default SelectInput;