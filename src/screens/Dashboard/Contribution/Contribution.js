import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme, lightTheme } from "../../../constants/colors";
import styles from "./styles";
import { scale, textScale } from "../../../constants/responsiveSizes";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";

const Contribution = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const [contributionAmount, setContributionAmount] = useState("");

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
            Contributions
          </Text>
        </View>
      </View>
    );
  }

  function handleContribute() {
    // Implement logic to handle the contribution
    // For now, let's just log the contribution amount
    console.log(`Contributed amount: ${contributionAmount}`);
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

      <View style={styles.content}>
        <Text
          style={{
            color: theme.textColor,
            marginBottom: 10,
            fontSize: textScale(16),
            fontFamily: "C-Regular",
            paddingHorizontal: scale(16),
          }}
        >
          Enter contribution amount:
        </Text>
        <Input
          keyboardType={"numeric"}
          label="Amount"
          placeholder="Enter Amount"
        />

        <CustomButton label="Contribute" onPress={handleContribute} />
      </View>
    </View>
  );
};

export default Contribution;
