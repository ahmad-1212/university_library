import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(35,40,57,1)",
    fontFamily: "IBM Plex Sans",
    color: "#ffffff",
    padding: 30,
    gap: 10,
  },

  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  title: {
    fontSize: 18,
    fontFamily: "IBM Plex Sans Bold",
  },

  text: {
    fontSize: 12,
  },

  main: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  item: {
    flexBasis: "45%",
    display: "flex",
    flexDirection: "column",
    gap: 7,
    border: "1px solid white",
    padding: 10,
    borderColor: "white",
    borderRadius: 5,
  },

  borderTop: {
    paddingVertical: 25,
    borderTop: "0.5px solid #888",
  },

  footer: {
    fontSize: 12,
  },
});
