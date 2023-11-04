import { View, Text, SafeAreaView, useColorScheme } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import Input from "../../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../../components/CustomButton";

const ContactUs = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  function renderHeader() {
    return (
      <Header
        label="Contact Us"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
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
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.subHeading}>
            Have a question or feedback about Ourvote application? We would love
            to hear from you. please fill out the form below
          </Text>
        </View>
        <Text style={styles.label}>Email</Text>
        <Input
          placeholder="e.g. email@example.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        />
        <Text style={styles.label}>Subject</Text>
        <Input
          placeholder="e.g support"
          value={subject}
          onChangeText={(text) => setSubject(text)}
          keyboardType={"default"}
        />
        <Text style={styles.label}>Your Message</Text>
        <Input
          placeholder="Enter the text here."
          value={details}
          multiline={true}
          onChangeText={(text) => setDetails(text)}
          styleInput={{
            height: moderateScale(155),
            paddingTop: verticalScale(14),
          }}
        />
      </KeyboardAwareScrollView>
      <CustomButton
        customStyles={{
          marginBottom: verticalScale(20),
        }}
        label="Send"
      />
    </SafeAreaView>
  );
};

export default ContactUs;
