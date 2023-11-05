import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import colors, { darkTheme, lightTheme } from "../../../constants/colors";
import { scale, verticalScale } from "../../../constants/responsiveSizes";

const RateApp = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handlers

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Renders

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
            Rate us
          </Text>
        </View>
      </View>
    );
  }

  function renderRateContainer() {
    return (
      <View
        style={[
          styles.rateContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text
          style={[
            styles.rateText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Your opinion matters!
        </Text>
        <Text
          style={[
            styles.rateText2,
            {
              color: theme.textColor,
            },
          ]}
        >
          We work super hard to make Augvents better for you guys and would love
          to know
        </Text>
        <Text
          style={[
            styles.rateText2,
            { fontWeight: "bold", color: theme.textColor },
          ]}
        >
          How would you rate our app:
        </Text>
        <View>
          <AirbnbRating
            count={5}
            onFinishRating={handleRatingChange}
            reviews={["Terrible", "OK", "Good", "Very Good", "Unbelievable"]}
            defaultRating={rating}
            reviewColor={colors.logoColor}
            selectedColor={theme.buttonBackground}
            size={40}
            unSelectedColor="#87CEEB"
          />
        </View>
        <Text
          style={{
            color: theme.textColor,
            fontWeight: "500",
            textAlign: "center",
            marginTop: verticalScale(10),
            fontSize: scale(20),
          }}
        >
          {rating}/5
        </Text>

        <TouchableOpacity
          disabled={rating === 0}
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            {
              backgroundColor:
                rating === 0 ? "#87CEEB" : theme.buttonBackground,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="white" size={"small"} />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
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
      {renderRateContainer()}
    </View>
  );
};

export default RateApp;
