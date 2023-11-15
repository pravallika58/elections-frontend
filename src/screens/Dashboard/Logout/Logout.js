import { View, Text, useColorScheme, SafeAreaView } from "react-native";
import React from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import { textScale } from "../../../constants/responsiveSizes";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";
import { removeData } from "../../../utils/helperFunctions";

const Logout = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const onPressLogout = async () => {
    await removeData("token");
    await removeData("selectedDefaultLocation");
    await removeData("selectedData");
    await removeData("mapType");
    navigation.navigate(navigationStrings.AUTH, {
      screen: navigationStrings.LOGIN,
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.logoutContainer,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          <Text
            style={{
              color: theme.textColor,
              fontSize: textScale(16),
              fontFamily: "C-Regular",
            }}
          >
            Are you sure you want to logout? It will clear all your saved items.
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => navigation.navigate(navigationStrings.MAP_SCREEN)}
              customStyles={styles.customStyles}
              label="No"
            />
            <CustomButton
              onPress={onPressLogout}
              customStyles={styles.customStyles}
              label="Yes"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Logout;
