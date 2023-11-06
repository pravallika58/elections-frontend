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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          customLabelStyle={{
            color: theme.textColor,
          }}
          label="Login"
          showRightArrow={false}
        />
        <View style={styles.vacantSpace} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
          styleInput={{
            backgroundColor: theme.inputContainer,
          }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType={"default"}
          secureTextEntry={true}
          styleInput={{
            backgroundColor: theme.inputContainer,
          }}
        />
        {/* Forgot Password? */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(navigationStrings.FORGOT_PASSWORD)}
        >
          <Text
            style={[
              styles.forgotText,
              {
                color: theme.textColor,
              },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          label="Login"
          onPress={() => navigation.navigate(navigationStrings.MAP_SCREEN)}
        />
        {/* Don't have an account? Sign Up */}
        <Text
          style={[
            styles.signUp,
            {
              color: theme.textColor,
            },
          ]}
        >
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate(navigationStrings.REGISTER)}
            style={{
              color: colors.buttonBackground,
            }}
          >
            Sign Up
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
