import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import Routes from "./src/navigation/Route";
import FlashMessage from "react-native-flash-message";
import { textScale } from "./src/constants/responsiveSizes";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "C-Bold": require("./src/assets/fonts/Comfortaa-Bold.ttf"),
    "C-Light": require("./src/assets/fonts/Comfortaa-Light.ttf"),
    "C-Medium": require("./src/assets/fonts/Comfortaa-Medium.ttf"),
    "C-Regular": require("./src/assets/fonts/Comfortaa-Regular.ttf"),
    "C-SemiBold": require("./src/assets/fonts/Comfortaa-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
        <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
        <FlashMessage
          position={"top"}
          titleStyle={{
            fontFamily: "C-Medium",
            fontSize: textScale(14),
          }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
