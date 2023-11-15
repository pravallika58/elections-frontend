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
import { userSignup } from "../../../redux/actions/auth";
import { apiPost } from "../../../utils/utils";
import { SIGNUP_API } from "../../../config/urls";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const isValidData = () => {
    const error = validator({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressRegister = async () => {
    const checkValidData = isValidData();
    if (checkValidData) {
      setLoading(true);
      let data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      };
      try {
        let res = await userSignup(data);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        showSucess("User Registered Successfully");
        navigation.navigate(navigationStrings.LOGIN);
      } catch (error) {
        showError(error?.error || error?.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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

        <CustomButton
          isLoading={loading}
          onPress={onPressRegister}
          label="Register"
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
