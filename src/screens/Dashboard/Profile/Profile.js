import { View, Text, SafeAreaView, Image, useColorScheme } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import { textScale, verticalScale } from "../../../constants/responsiveSizes";
import { darkTheme, lightTheme } from "../../../constants/colors";
import imagePath from "../../../constants/imagePath";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  function renderHeader() {
    return (
      <Header
        label="Profile"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
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
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.starting}>
          <Text style={styles.textStyle}>Profile</Text>
          <Text style={styles.textStyle}>Name of cause</Text>
        </View>
        <View>
          <Image source={imagePath.icUser} style={styles.userProfile} />
        </View>

        <Input
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
          label="First Name"
        />
        <Input
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name"
          label="Last Name"
        />
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Name"
          label="Title"
        />
        <Input
          keyboardType={"email-address"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="eg:abc@gmail.com"
          label="Email"
        />
      </KeyboardAwareScrollView>
      <CustomButton
        label="Save"
        customStyles={{
          marginBottom: verticalScale(10),
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
