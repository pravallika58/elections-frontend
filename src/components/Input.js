import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import colors, { darkTheme, lightTheme } from "../constants/colors";

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  onChangeText,
  value,
  styleInput,
  multiline,
  label,
  customContainerStyle,
  onFocus,
  isRequired,
  onSubmitEditing,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <View style={[styles.container, customContainerStyle]}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            styles.labelStyle,
            {
              color: theme.textColor,
            },
          ]}
        >
          {label}
        </Text>
        {isRequired && (
          <Text
            style={{
              color: "red",
              fontSize: 16,
              fontWeight: "bold",
              paddingLeft: 4,
            }}
          >
            *
          </Text>
        )}
      </View>
      <TextInput
        autoCapitalize={"none"}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        style={[
          styles.inputStyle,
          styleInput,
          {
            backgroundColor: theme.inputContainer,
            color: theme.textColor,
          },
        ]}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(16),
  },
  inputStyle: {
    fontSize: textScale(16),
    fontFamily: "C-Regular",
    borderRadius: moderateScale(24),
    padding: moderateScale(9),
  },
  labelStyle: {
    fontSize: textScale(20),
    fontFamily: "C-Regular",
    fontWeight: "700",
    paddingBottom: verticalScale(10),
    paddingLeft: scale(4),
  },
});

export default Input;
