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
  logoutContainer: {
    marginHorizontal: scale(20),
    padding: scale(20),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  customStyles: {
    width: "35%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default styles;
