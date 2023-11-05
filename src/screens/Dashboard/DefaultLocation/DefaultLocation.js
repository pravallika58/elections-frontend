import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import IconTextIcon from "../../../components/IconTextIcon";
import dummyData from "../../../constants/dummyData";
import WordIcon from "../../../components/WordIcon";
import imagePath from "../../../constants/imagePath";

const DefaultLocation = ({ navigation }) => {
  const [title, setTitle] = React.useState("Current Location");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  function renderHeader() {
    return (
      <Header
        label="Default Location"
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

  function renderFavoriteList() {
    return (
      <>
        {dummyData.favorites.map((item, index) => (
          <TouchableOpacity
            onPress={() => setTitle(item.title)}
            activeOpacity={0.8}
            style={styles.favoriteLocation}
            key={item.id}
          >
            <View>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.subTitleStyle}>{item.subtitle}</Text>
            </View>
            {title === item.title && (
              <Image source={imagePath.icTick} style={styles.tickStyle} />
            )}
          </TouchableOpacity>
        ))}
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
      <View style={styles.subHeadingContainer}>
        <Text
          style={[
            styles.subHeading,
            {
              color: theme.textColor,
            },
          ]}
        >
          Select a location to display, when app is opened
        </Text>
      </View>
      <IconTextIcon label={title} showTick={true} />
      <View style={styles.favoriteStyleCont}>
        <Text
          style={[
            styles.favoriteStyle,
            {
              color: theme.textColor,
            },
          ]}
        >
          FAVORITES
        </Text>
      </View>
      {renderFavoriteList()}
      <WordIcon
        customSubTitle={{
          paddingHorizontal: scale(29),
        }}
        label="Exit Locations"
      />
    </SafeAreaView>
  );
};

export default DefaultLocation;
