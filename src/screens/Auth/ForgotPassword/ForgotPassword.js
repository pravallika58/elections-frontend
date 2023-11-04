import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import colors, { darkTheme, lightTheme } from "../../../constants/colors";
import Input from "../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <KeyboardAwareScrollView style={styles.container}>
        <Header
          label="Forgot Password"
          showRightArrow={true}
          onPressArrow={() => navigation.navigate(navigationStrings.LOGIN)}
        />
        <View style={styles.vacantSpace} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        />

        <CustomButton label="Reset Password" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
