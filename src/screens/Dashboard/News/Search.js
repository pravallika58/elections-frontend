import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  Text,
} from "react-native";
import Card from "../../../components/Card";
import { darkTheme, lightTheme } from "../../../constants/colors";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { scale, verticalScale } from "../../../constants/responsiveSizes";

const News = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const searchNews = async (text) => {
    setSearchText(text);
    if (text.length > 2) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=ec43e95a5abe4c93a755bdfe4dcba819&q=${text}`
      );

      const newsData = await response.json();
      setData(newsData.articles);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <TouchableOpacity
        style={{
          marginHorizontal: scale(16),
          marginTop: verticalScale(16),
        }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color={theme.textColor} />
      </TouchableOpacity>
      <Text
        style={[
          styles.textStyle,
          {
            color: theme.textColor,
          },
        ]}
      >
        Let's Explore today's
      </Text>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.bottomSheetColor,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.textColor,
            },
          ]}
          placeholder="Enter your query..."
          value={searchText}
          onChangeText={(text) => searchNews(text)}
        />
      </View>
      <View style={styles.newsList}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: verticalScale(150),
            paddingTop: verticalScale(16),
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => {
            return <Card item={item} navigation={navigation} index={index} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default News;
