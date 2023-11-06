import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { darkTheme, lightTheme } from "../constants/colors";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import { AntDesign } from "@expo/vector-icons";
import navigationStrings from "../constants/navigationStrings";

const styles = {
  cardContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
  },
  image: {
    height: moderateScale(200),
    width: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: textScale(18),
    fontFamily: "C-Regular",
    fontWeight: "bold",
    paddingTop: verticalScale(8),
  },
  description: {
    fontSize: textScale(14),
    marginBottom: moderateScale(8),
    paddingTop: verticalScale(8),
  },

  author: {
    fontSize: textScale(14),
    color: "#888",
  },
  publishedAt: {
    fontSize: textScale(12),
    fontFamily: "C-Regular",
    paddingTop: moderateScale(8),
  },
  readMoreButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    borderRadius: moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  readMoreText: {
    fontSize: textScale(14),
    color: "white",
    fontWeight: "500",
  },
  sourceContainer: {
    position: "absolute",
    top: verticalScale(8),
    right: scale(8),
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
  },
  sourceText: {
    fontSize: textScale(12),
    color: "white",
  },
};

const Card = ({ item, navigation, index }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={[styles.cardContainer]}>
      <Image
        source={{
          uri: item.urlToImage
            ? item.urlToImage
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULSPiQKGEcCtCxrkr4t9Ub8U-Jwzv3kXu2RMOzQoihg&s",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.title,
            {
              color: theme.textColor,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.publishedAt,
            {
              color: theme.textColor,
            },
          ]}
        >
          {new Date(item.publishedAt).toLocaleString("en-GB", {
            timeZone: "UTC",
          })}
        </Text>
      </View>
      <Text
        style={[
          styles.description,
          {
            color: theme.textColor,
          },
        ]}
      >
        {item.description}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.readMoreButton,
          {
            backgroundColor: theme.buttonBackground,
          },
        ]}
        onPress={() =>
          navigation.navigate(navigationStrings.NEWS_VIEWER, {
            url: item.url,
          })
        }
      >
        <Text style={styles.readMoreText}>Read More</Text>
        <AntDesign name="arrowright" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <View
        style={[
          styles.sourceContainer,
          {
            backgroundColor: theme.buttonBackground,
          },
        ]}
      >
        <Text style={styles.sourceText}>{item.source.name}</Text>
      </View>
    </View>
  );
};

export default Card;
