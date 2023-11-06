import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customLabelStyle: {
    fontSize: textScale(24),
  },
  customHeaderContainer: {
    borderBottomWidth: 0.5,
    paddingBottom: verticalScale(20),
    marginHorizontal: 0,
    paddingHorizontal: scale(16),
    borderColor: "grey",
  },
  header: {
    padding: moderateScale(16),
    marginHorizontal: scale(16),
    marginTop: verticalScale(16),
    borderRadius: moderateScale(18),
    marginBottom: verticalScale(16),
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: textScale(14),
    fontWeight: "700",
    fontFamily: "C-Regular",
  },
  textStyle: {
    fontSize: textScale(30),
    fontWeight: "bold",
    fontFamily: "C-Regular",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
});

export default styles;
