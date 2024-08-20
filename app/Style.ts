import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Corrected to a valid color code
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center",
  },
  /** Hero */
  hero: {
    backgroundColor: "#000000", // Corrected to a valid color code
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: "100%",
    height: 400,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#000000", // Corrected to a valid color code
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: "#fff2dd",
    transform: [
      {
        rotate: "-5deg",
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#281b52",
  },
  /** Button */
  button: {
    backgroundColor: "#56409e",
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});

export default styles;
