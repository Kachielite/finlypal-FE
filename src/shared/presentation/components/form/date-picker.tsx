import { useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

type DatePickerProps = {
  label: string;
  placeholder: string;
  error?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  icon?: React.ReactNode;
};

const DatePickerInput = ({ label, placeholder, error, value, onChange, icon }: DatePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value || new Date());

  const handleChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false); // Close immediately on Android
      if (selectedDate) onChange(selectedDate);
    } else {
      setTempDate(selectedDate || tempDate); // Temporarily store selected date on iOS
    }
  };

  const handleConfirm = () => {
    if (tempDate) onChange(tempDate);
    setShowPicker(false);
  };

  return (
    <View className="w-full flex flex-col justify-start items-start gap-y-4">
      {/* Label */}
      <Text className="font-urbanist-bold text-lg text-white">{label}</Text>

      {/* Pressable Input (Opens Date Picker) */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`w-full flex flex-row justify-between items-center border-b pb-2 bg-transparent ${
          error ? 'border-b-red-500' : 'border-b-secondary'
        }`}
      >
        <Text className={`text-[20px] font-urbanist-bold ${value ? 'text-white' : 'text-gray-500'}`}>
          {value ? moment(value).format("DD MMM, YYYY") : placeholder}
        </Text>

        {/* Icon (Optional) */}
        {icon}
      </TouchableOpacity>

      {/* Android Date Picker (Shows Inline) */}
      {showPicker && Platform.OS === 'android' && (
        <RNDateTimePicker
          value={moment(value).toDate() || new Date()}
          mode="date"
          display="default"
          textColor="white" // White text
          onChange={handleChange}
        />
      )}

      {/* iOS Date Picker (Modal) */}
      {showPicker && Platform.OS === 'ios' && (
        <Modal transparent={true} animationType="slide">
          <View className="flex-1 justify-end bg-black bg-opacity-50">
            <View className="bg-dark px-4 py-6 rounded-t-2xl">
              <RNDateTimePicker
                value={moment(value).toDate()}
                mode="date"
                display="spinner"
                textColor="white" // White text
                onChange={handleChange}
              />
              <TouchableOpacity onPress={handleConfirm} className="mt-4 px-4 py-2 bg-secondary rounded-[24px]">
                <Text className="text-white text-center text-[18px] font-urbanist-bold py-[8px]">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Error Message */}
      {error && <Text className="font-urbanist-regular text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default DatePickerInput;