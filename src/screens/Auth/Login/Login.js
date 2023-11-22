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
import { showError, storeData } from "../../../utils/helperFunctions";
import { userLogin } from "../../../redux/actions/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const isValidData = () => {
    const error = validator({
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressLogin = async () => {
    const checkValid = isValidData();
    if (checkValid) {
      setLoading(true);
      try {
        const res = await userLogin({
          email,
          password,
        });

        setEmail("");
        setPassword("");
        await storeData("token", res?.data?.refreshToken);
        await storeData("userId", JSON.stringify(res?.data?._id));
        await storeData("userData", JSON.stringify(res.data));
        navigation.replace(navigationStrings.MAIN, {
          screen: navigationStrings.MAP_SCREEN,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    }
  };

  const onPressGuestLogin = async () => {
    navigation.replace(navigationStrings.MAIN, {
      screen: navigationStrings.MAP_SCREEN,
    });
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
          isLoading={loading}
          label="Login"
          onPress={onPressLogin}
        />
        <CustomButton
          label="Login as Guest"
          onPress={onPressGuestLogin}
          customStyles={{
            backgroundColor: theme.buttonBackground,
          }}
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
