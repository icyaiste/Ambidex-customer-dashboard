import { StyleSheet } from "@react-pdf/renderer";
import "./fonts.ts";
import { stat } from "fs";
import { start } from "repl";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontSize: 12,
    fontFamily: "Montserrat",
  },
  headerImg: {
    width: "100%",
    height: "300px",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  headerSection: {
    paddingHorizontal: "40px",
  },
  shopName: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#FFFF",
    textTransform: "uppercase",
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 58,
    fontFamily: "DM Serif Display",
    color: "#FFFF",
    textTransform: "uppercase",
  },
  month: {
    fontSize: 10,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#FFFF",
    textTransform: "uppercase",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    color: "#FFF",
    flexDirection: "column",
    marginTop: 30,
    width: "100p%",
    alignItems: "center",
  },
  numbers: {
    flexDirection: "row",
    fontSize: 35,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: -5,
  },
  textSmall: {
    fontSize: 12,
    fontFamily: "Montserrat",
    color: "#FFF",
    alignSelf: "flex-end",
    marginLeft: 4,
    paddingBottom: 5,
  },
  h2: {
    fontSize: 18,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 30,
    color: "#FFF",
    marginTop: 30,
  },
  textBold: {
    fontWeight: "bold",
  },
  textThin: {
    fontFamily: "Montserrat",
    fontWeight: "normal",
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "15px",
  },
  paragraph: {
    width: "220px",
    textAlign: "justify",
    fontSize: 12,
    fontFamily: "Montserrat",
    marginBottom: 20,
    color: "#262626",
    lineHeight: 1.1,
  },
  image: {
    height: "400px",
    width: "270px",
    marginTop: "100px",
  },
  title: {
    fontSize: 15,
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    textTransform: "uppercase",
    color: "#262626",
    marginBottom: 5,
    width: "200px",
  },
  logo: {
    width: "200px",
    height: "auto",
    marginLeft: "auto",
    position: "absolute",
    bottom: -50,
    right: 20,
  },
});
