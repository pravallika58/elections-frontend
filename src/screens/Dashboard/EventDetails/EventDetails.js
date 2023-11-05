import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import imagePath from "../../../constants/imagePath";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import navigationStrings from "../../../constants/navigationStrings";
import { Image } from "expo-image";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import colors from "../../../constants/colors";
import Header from "../../../components/Header";

const EventDetails = ({ route, navigation }) => {
  const [modalWithOptions, setModalWithOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { item } = route.params;

  const scrollX = new Animated.Value(0);
  const { width } = Dimensions.get("window");
  let position = Animated.divide(scrollX, width);

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

  function renderImages() {
    if (!item || !item.images) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width, height: "100%" }}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {item.images.map((source, i) => {
              return (
                <Image
                  key={i}
                  style={{ width, height: width }}
                  source={source}
                  transition={1000}
                  placeholder={imagePath.icDefault}
                  placeholderContentFit="cover"
                />
              );
            })}
          </ScrollView>
          <View style={styles.pagination}>
            {item.images.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: colors.logoColor,
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  function renderDetails() {
    return (
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.nameOfSinger}>
          <View
            style={{
              width: "80%",
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.singerNameText}
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.singerNameText,
                {
                  fontSize: textScale(12),
                  paddingTop: verticalScale(5),
                },
              ]}
            >
              {item.artist_name ? item.artist_name : "No Artist"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setModalWithOptions(true)}
            activeOpacity={0.8}
            style={styles.plusCont}
          >
            <Image source={imagePath.icPlus} style={styles.plus} />
          </TouchableOpacity>
        </View>
        <View style={styles.addressCont}>
          <Text style={styles.addressText}>
            Address: {item.event_address} {item.event_city} {item.event_state}
          </Text>
          <Text style={styles.addressText}>
            Start date & Time: {item.start_date} {item.start_time}
          </Text>
          <Text style={styles.addressText}>
            End date & Time: {item.end_date} {item.end_time}
          </Text>
        </View>
        <View style={[styles.addressCont, { borderBottomWidth: 0 }]}>
          <Text style={styles.addressText}>{item.description}</Text>
        </View>
      </ScrollView>
    );
  }

  function renderOptionsModal() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={modalWithOptions}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
          onBackdropPress={() => setModalWithOptions(false)}
          swipeDirection={["down"]}
          onSwipeComplete={() => setModalWithOptions(false)}
        >
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(navigationStrings.MAP_ROUTE),
                  setModalWithOptions(false);
              }}
              activeOpacity={0.8}
              style={styles.container2}
            >
              <Entypo name="location-pin" size={24} color="black" />
              <Text style={styles.textStyle}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.container2}>
              {isLiked ? (
                <AntDesign name="heart" size={24} color="red" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
              <Text style={styles.textStyle}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onShare(item.event_link)}
              style={styles.container2}
            >
              <AntDesign name="sharealt" size={24} color="black" />
              <Text style={styles.textStyle}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.container2}>
              <Entypo name="edit" size={24} color="black" />
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.container2}>
              <AntDesign name="delete" size={24} color="red" />
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView
        style={[
          styles.container,
          {
            marginBottom: verticalScale(20),
          },
        ]}
      >
        {modalWithOptions && renderOptionsModal()}
        {renderImages()}
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;