import { StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constants/responsiveSizes";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cheers: {
    width: moderateScale(110),
    height: moderateScale(110),
  },
  textStyle: {
    fontSize: textScale(14),
    fontFamily: "C-Regular",
    color: colors.black,
    fontWeight: "700",
  },
});

export default styles;
