import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchHeader from "../../../components/SearchHeader";
import Card from "../../../components/Card";
import colors, { darkTheme, lightTheme } from "../../../constants/colors";
import styles from "./styles";
import {
  moderateScale,
  scale,
  verticalScale,
} from "../../../constants/responsiveSizes";

const News = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [Select, setSelect] = useState(0);
  const [Laoding, setLaoding] = useState(false);
  const [Category, setCategory] = React.useState([
    {
      id: 1,
      name: "Top Headlines",
      category: "general",
    },
    {
      id: 8,
      name: "Politics",
      category: "politics",
    },
    {
      id: 5,
      name: "Sports",
      category: "sports",
    },
    {
      id: 2,
      name: "Business",
      category: "business",
    },
    {
      id: 3,
      name: "Entertainment",
      category: "entertainment",
    },
    {
      id: 4,
      name: "Health",
      category: "health",
    },
    {
      id: 6,
      name: "Science",
      category: "science",
    },
    {
      id: 7,
      name: "Technology",
      category: "technology",
    },
  ]);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const getData = async () => {
    setLaoding(true);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=ec43e95a5abe4c93a755bdfe4dcba819&category=${Category[Select].category}`
    );

    const data = await response.json();
    setData(data.articles);
    setLaoding(false);
  };

  const getData2 = async (category) => {
    setLaoding(true);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=ec43e95a5abe4c93a755bdfe4dcba819&category=${category}`
    );

    const data = await response.json();
    setData(data.articles);
    setLaoding(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {Laoding ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={theme.buttonBackground} size={36} />
        </View>
      ) : (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <SearchHeader navigation={navigation} />
          <View>
            <FlatList
              data={Category}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelect(index);
                      getData2(Category[index].category);
                    }}
                    style={{
                      backgroundColor:
                        Select === index ? theme.buttonBackground : "white",
                      padding: moderateScale(8),
                      borderRadius: moderateScale(8),
                      margin: moderateScale(8),
                    }}
                  >
                    <Text
                      style={[
                        styles.nameText,
                        {
                          color: Select === index ? colors.white : colors.black,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data}
              contentContainerStyle={{
                paddingBottom: verticalScale(100),
              }}
              renderItem={({ item, index }) => {
                return (
                  <Card item={item} navigation={navigation} index={index} />
                );
              }}
              refreshing={Laoding}
              onRefresh={() => getData2(Category[Select].category)}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default News;
