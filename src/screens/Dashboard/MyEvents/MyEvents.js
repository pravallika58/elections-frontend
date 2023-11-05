import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import imagePath from "../../../constants/imagePath";
import dummyData from "../../../constants/dummyData";
import navigationStrings from "../../../constants/navigationStrings";
import { darkTheme, lightTheme } from "../../../constants/colors";

const MyEvents = ({ navigation }) => {
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
            My Events
          </Text>
        </View>
      </View>
    );
  }

  function renderListOfEvents() {
    return (
      <View style={styles.flatlistCont}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dummyData.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.EVENT_DETAILS, {
                  item: item,
                })
              }
              activeOpacity={0.8}
              style={[
                styles.card,
                {
                  backgroundColor: theme.background,
                },
              ]}
            >
              <View style={styles.cardImage}>
                <Image
                  source={item.image}
                  style={styles.image}
                  placeholder={imagePath.icDefault}
                  placeholderContentFit="fill"
                  contentFit="cover"
                  transition={1000}
                />
              </View>

              <View style={styles.cardText}>
                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color: theme.textColor,
                    },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.cardSubTitle,
                    {
                      color: theme.textColor,
                    },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}
      {renderListOfEvents()}
    </View>
  );
};

export default MyEvents;
