import {
  View,
  Text,
  useColorScheme,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import styles from "./styles";
import colors, { darkTheme, lightTheme } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import constants from "../../../constants/constants";

const AboutElections = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color={theme.textColor}
        />
        <View style={styles.eventStyle}>
          <Text
            style={[
              styles.heading,
              {
                color: theme.textColor,
              },
            ]}
          >
            About Us
          </Text>
        </View>
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View
        style={{ marginTop: 20, alignItems: "center", marginLeft: scale(6) }}
      >
        <View>
          <Image source={item.image} style={styles.teamImage} />
        </View>

        <Text
          style={[
            styles.teamName,
            {
              color: theme.textColor,
            },
          ]}
        >
          {item.name}
        </Text>

        <Text
          style={[
            styles.teamRole,
            {
              color: theme.textColor,
            },
          ]}
        >
          {item.role}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}
      <View style={styles.aboutText}>
        <Text
          style={{
            fontSize: textScale(16),
            fontFamily: "C-Regular",
            color: theme.textColor,
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          paddingVertical: scale(5),
          textAlign: "center",
          fontSize: textScale(30),
          paddingTop: verticalScale(20),
          textShadowColor: colors.black,
          color: theme.textColor,
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 1,
        }}
      >
        MEET THE TEAM
      </Text>
      <View>
        <FlatList
          numColumns={4}
          contentContainerStyle={styles.mainView}
          data={constants.team}
          keyExtractor={() => Math.random().toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

export default AboutElections;
