import { StyleSheet } from "react-native";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    paddingHorizontal: scale(28),
    paddingVertical: verticalScale(20),
  },
  heading: {
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: colors.black,
  },
  subHeading: {
    fontSize: textScale(16),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: colors.black,
    paddingTop: verticalScale(10),
  },
  label: {
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: colors.black,
    paddingHorizontal: scale(28),
    paddingTop: verticalScale(20),
  },
});

export default styles;
