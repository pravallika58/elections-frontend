import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import imagePath from "../../../constants/imagePath";
import navigationStrings from "../../../constants/navigationStrings";
import { darkTheme, lightTheme } from "../../../constants/colors";
import { getAllEvents } from "../../../redux/actions/event";
import { textScale, verticalScale } from "../../../constants/responsiveSizes";
import { useFocusEffect } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { GOOGLE_API_KEY } from "../../../constants/constants";
import { getData } from "../../../utils/helperFunctions";

const AllEvents = ({ navigation, route }) => {
  const { dataEvents, key } = route.params;

  const [events, setEvents] = useState([]);
  const [mainFilteredEventsByLocation, setMainFilteredEventsByLocation] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      const location = await getCurrentPositionAsync({});
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const result = await response.json();
      const firstResult = result.results[0];
      const addressComponents = firstResult.address_components;
      const cityComponent = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      const stateComponent = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      const city = cityComponent ? cityComponent.long_name : "";
      const state = stateComponent ? stateComponent.short_name : "";
      const cityState = `${city}, ${state}`;
      const res = await getData("selectedDefaultLocation");
      const data = JSON.parse(res);

      const eventsData = await getAllEvents();
      setEvents(eventsData);

      if (data) {
        data.cur ? setTitle(data.subLabel) : setTitle(data.label);
        const location = data.cur
          ? data.subLabel.toLowerCase()
          : data.label.toLowerCase();

        const filteredEvents = eventsData.filter((event) => {
          const eventLocation = event.city.toLowerCase();
          return eventLocation.includes(location);
        });
        if (
          key === "today" ||
          key === "week" ||
          key === "month" ||
          key === "mapFilter" ||
          key === "calendar"
        ) {
          setMainFilteredEventsByLocation(dataEvents);
        } else {
          setMainFilteredEventsByLocation(filteredEvents);
        }
      } else {
        setTitle(cityState);
        const currentLocation = cityState.toLowerCase();
        const filteredEvents = eventsData.filter((event) => {
          const eventLocation = event.city.toLowerCase();
          return eventLocation.includes(currentLocation);
        });
        if (
          key === "today" ||
          key === "week" ||
          key === "month" ||
          key === "mapFilter" ||
          key === "calendar"
        ) {
          setMainFilteredEventsByLocation(dataEvents);
        } else {
          setMainFilteredEventsByLocation(filteredEvents);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchData:", error);
      setLoading(false);
    }
  };

  const allEvents = async () => {
    setLoading(true);
    const result = await getAllEvents();
    setEvents(result);
    setLoading(false);
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
            {key === "today"
              ? "Events happening Today"
              : key === "mapFilter"
              ? "Filter Events"
              : key === "week"
              ? "Events coming in next 7 days"
              : key === "month"
              ? "Events coming in next 30 days"
              : "All Events"}
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
            eventId: item._id,
            key: "allEvents",
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
          {key === "today" ||
            key === "week" ||
            (key === "month" && (
              <Text
                numberOfLines={2}
                style={[
                  styles.cardSubTitle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                {item.startdate.split("T")[0]}
              </Text>
            ))}
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
          No events found!
        </Text>
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
        {mainFilteredEventsByLocation.length === 0 ? (
          renderNoEvents()
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mainFilteredEventsByLocation}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={fetchData}
          />
        )}
      </View>
    );
  }

  return (
    <>
      {loading ? (
        <View
          style={[
            styles.activityIndicator,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <ActivityIndicator size={"small"} color={theme.textColor} />
        </View>
      ) : (
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
      )}
    </>
  );
};

export default AllEvents;
