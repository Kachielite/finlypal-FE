import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const IncomeExpenseSwitch = ({ onToggle }:{onToggle: (value: string) => void}) => {
  const [active, setActive] = useState("income");
  const switchAnim = new Animated.Value(active === "income" ? 0 : 1);

  const toggleSwitch = (value: string) => {
    setActive(value);
    Animated.timing(switchAnim, {
      toValue: value === "income" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onToggle(value);
  };

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90], // Adjust based on width
  });

  return (
    <View
      style={{
        width: 180,
        height: 40,
        backgroundColor: "#35383F",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        position: "relative",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
          backgroundColor: "#17CE92",
          borderRadius: 20,
          transform: [{ translateX }],
        }}
      />
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          zIndex: 2,
        }}
        onPress={() => toggleSwitch("income")}
      >
        <Text style={{ color: active === "income" ? "#35383F" : "#17CE92", fontWeight: "bold" }}>
          INCOME
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          zIndex: 2,
        }}
        onPress={() => toggleSwitch("expense")}
      >
        <Text style={{ color: active === "expense" ? "#35383F" : "#17CE92", fontWeight: "bold" }}>
          EXPENSE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default IncomeExpenseSwitch;