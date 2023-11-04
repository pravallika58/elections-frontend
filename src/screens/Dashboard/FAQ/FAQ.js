import { View, Text, SafeAreaView, Image, useColorScheme } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import Accordion from "react-native-collapsible/Accordion";
import dummyData from "../../../constants/dummyData";
import imagePath from "../../../constants/imagePath";
import { darkTheme, lightTheme } from "../../../constants/colors";

const FAQ = ({ navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const renderHeader2 = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Image
          resizeMode="contain"
          source={imagePath.icDownArrow}
          style={styles.downArrow}
        />
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

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

  function renderFaqs() {
    return (
      <View style={styles.description}>
        <Accordion
          underlayColor="transparent"
          sections={dummyData.SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader2}
          renderContent={renderContent}
          onChange={updateSections}
        />
      </View>
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
        <Text style={styles.bigTitle}>Frequently Asked Questions</Text>
      </View>
      {renderFaqs()}
    </SafeAreaView>
  );
};

export default FAQ;
