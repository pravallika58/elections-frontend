import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import imagePath from "../../../constants/imagePath";
import navigationStrings from "../../../constants/navigationStrings";
import { darkTheme, lightTheme } from "../../../constants/colors";
import { getMyDetails } from "../../../redux/actions/auth";
import { getAllEvents } from "../../../redux/actions/event";
import { textScale, verticalScale } from "../../../constants/responsiveSizes";

const MyEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    getTheEventsCreatedByMe();
  }, []);

  const getTheEventsCreatedByMe = async () => {
    setLoading(true);
    try {
      const res = await getMyDetails();
      const allEvents = await getAllEvents();

      const eventsCreatedByYou = [];

      if (res.data && res.data.events && Array.isArray(res.data.events)) {
        res.data.events.forEach((event) => {
          const foundEvent = allEvents.find((item) => item._id === event);
          if (foundEvent !== undefined) {
            eventsCreatedByYou.push(foundEvent);
          }
        });

        setEvents(eventsCreatedByYou);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationStrings.EVENT_DETAILS, {
            key: "myEvents",
            eventId: item._id,
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
            source={item.images[0].url}
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
            {item.eventname}
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
    );
  }

  function renderNoEvents() {
    return (
      <View
        style={{
          marginTop: verticalScale(30),
        }}
      >
        <Text
          style={{
            color: theme.textColor,
            fontSize: textScale(20),
            fontFamily: "C-Regular",
            textAlign: "center",
          }}
        >
          No events created
        </Text>
      </View>
    );
  }

  function renderActivityIndicator() {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="small" color={theme.buttonBackground} />
      </View>
    );
  }

  function renderListOfEvents() {
    return (
      <View
        style={[
          styles.flatlistCont,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        {loading ? (
          renderActivityIndicator()
        ) : events.length === 0 ? (
          renderNoEvents()
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={getTheEventsCreatedByMe}
          />
        )}
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
