import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Header from "../../../components/Header";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";

const NewsViewer = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const { url } = route.params;
  console.log(url);
  function renderHeader() {
    return (
      <Header
        label="Events"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={styles.customLabelStyle}
        customHeaderContainer={styles.customHeaderContainer}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

export default NewsViewer;
