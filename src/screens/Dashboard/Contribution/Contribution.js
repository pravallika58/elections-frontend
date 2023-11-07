import { View, Text } from "react-native";
import React, { useState } from "react";
import { CardField } from "@stripe/stripe-react-native";

const Contribution = () => {
  const [card, setCard] = useState(null);

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
    </View>
  );
};

export default Contribution;
