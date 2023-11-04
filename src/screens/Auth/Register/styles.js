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
  vacantSpace: {
    height: moderateScale(100),
  },
  forgotText: {
    fontSize: textScale(14),
    fontFamily: "C-Regular",
    textAlign: "right",
    marginHorizontal: scale(24),
    marginTop: verticalScale(12),
  },
  signUp: {
    fontSize: textScale(14),
    fontFamily: "C-Regular",
    textAlign: "center",
    marginTop: verticalScale(12),
  },
});

export default styles;
