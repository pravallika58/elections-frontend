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

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          label="Register"
          showRightArrow={true}
          onPressArrow={() => navigation.goBack()}
        />
        {/* <View style={styles.vacantSpace} /> */}
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          keyboardType={"default"}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          keyboardType={"default"}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          keyboardType={"default"}
          secureTextEntry={true}
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          keyboardType={"default"}
          secureTextEntry={true}
        />

        <CustomButton label="Register" />
        {/* Don't have an account? Sign Up */}
        <Text
          style={[
            styles.signUp,
            {
              color: theme.textColor,
            },
          ]}
        >
          Already have an account?{" "}
          <Text
            onPress={() => navigation.navigate(navigationStrings.LOGIN)}
            style={{
              color: colors.buttonBackground,
            }}
          >
            Sign In
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
