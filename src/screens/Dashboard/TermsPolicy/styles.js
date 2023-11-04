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
  bigTitleCont: {
    marginTop: verticalScale(10),
    alignItems: "center",
    paddingBottom: verticalScale(20),
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  bigTitle: {
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: colors.black,
  },
  description: {
    paddingHorizontal: scale(45),
    paddingVertical: verticalScale(2),
    marginTop: verticalScale(15),
  },
  contentText: {
    fontSize: textScale(16),
    fontFamily: "C-Regular",
    color: colors.black,
  },
});

export default styles;
