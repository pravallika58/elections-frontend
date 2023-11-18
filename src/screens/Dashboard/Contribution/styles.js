import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: moderateScale(50),
    marginTop: verticalScale(60),
    paddingHorizontal: moderateScale(16),
  },
  eventStyle: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: colors.black,
  },
  content: {
    marginTop: verticalScale(20),
  },
});

export default styles;
