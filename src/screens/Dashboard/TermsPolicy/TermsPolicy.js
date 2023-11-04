import {
  View,
  Text,
  SafeAreaView,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";

import { darkTheme, lightTheme } from "../../../constants/colors";
import dummyData from "../../../constants/dummyData";

const TermsPolicy = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  function renderHeader() {
    return (
      <Header
        label="Elections"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
        location={true}
        locationText="Bowling Green, OH"
        customHeaderContainer={{
          borderBottomWidth: 0.5,
          paddingBottom: verticalScale(20),
          marginHorizontal: 0,
          paddingHorizontal: scale(16),
          borderColor: "grey",
        }}
      />
    );
  }

  function renderTermsPolicy() {
    return (
      <>
        {dummyData.PrivacyPolicy.map((item, index) => {
          return (
            <View style={styles.description}>
              <Text style={styles.contentText}>
                {index + 1}: {item.description}
              </Text>
            </View>
          );
        })}
      </>
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

      <View style={styles.bigTitleCont}>
        <Text style={styles.bigTitle}>Terms of use & Privacy Policy</Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {renderTermsPolicy()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsPolicy;
