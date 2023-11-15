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
import validator from "../../../utils/validation";
import { showError, showSucess } from "../../../utils/helperFunctions";
import { forgotPassword } from "../../../redux/actions/auth";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const isValidData = () => {
    const error = validator({
      email,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressResetPassword = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      try {
        const res = await forgotPassword({
          email,
        });
        console.log(res.data);
        setEmail("");
        showSucess("Password reset link has been sent to your email");
        navigation.replace(navigationStrings.AUTH, {
          screen: navigationStrings.LOGIN,
        });
        setLoading(false);
      } catch (error) {
        showError("Email is not valid");
        setEmail("");

        setLoading(false);
      }
    }
  };

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

        <CustomButton
          isLoading={loading}
          onPress={onPressResetPassword}
          label="Reset Password"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
