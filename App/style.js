import React, { StyleSheet } from "react-native";
import { colors, fonts } from "./theme";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerList: {
    margin: 10
  },
  sectionListHeader: {
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
    fontSize: 22,
    color: "white"
  },
  monthPicker: {
    alignItems: "center",
    alignSelf: "stretch",
    width: "100%",
    
    backgroundColor: "#000000",
  },
  monthDisplay:{
    padding:13,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    width: "100%",
    backgroundColor: 'aliceblue',
  },
  leftRightMonthIcon:{
    width: "20%",
    height: 50,
    textAlign: 'center', 
    backgroundColor: "rgb(33,150,243)"
  },
  sectionListRow: {
    flex: 1,
    alignSelf: "stretch",
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: "row"
  },
  sectionListItem: {
    padding: 10,
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "white"
  },
  backgroundImage: { width: "100%", height: "100%" },
  inputItem: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  modalBackground: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  activityLoading: {
    backgroundColor: "#00000040",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  loginRegText: {
    fontSize: 25,
    paddingBottom: 10,
    color: "white"
  },
  loginRegSubText: {
    fontSize: 18,
    paddingBottom: 20,
    color: "white"
  },
  input: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    padding: 13
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // width:250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  },
  select: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    padding: 10,
    width: 200,
    borderWidth: 0,
    alignSelf: "stretch"
  },
  inputErr: { color: "red", marginLeft: 10, position: "absolute", bottom: -20 },
  buttonPrimary: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10
  },
  buttonDanger: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "red"
  }
});
