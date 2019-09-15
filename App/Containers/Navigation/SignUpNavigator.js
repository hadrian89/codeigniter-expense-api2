import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "./TabBarIcon";

import RegistrationScreen from "../Registration/index";
import LoginScreen from "../Login/index";

const config = Platform.select({
  web: { headerMode: "screen" }
});

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "login"
      }
    />
  )
};

LoginStack.path = "";

const RegistrationStack = createStackNavigator(
  {
    Registration: RegistrationScreen
  },
  config
);

RegistrationStack.navigationOptions = {
  tabBarLabel: "Registration",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "edit"}
    />
  )
};

RegistrationStack.path = "";

const tabNavigator = createBottomTabNavigator({
  LoginStack,
  RegistrationStack
});

tabNavigator.path = "";

export default tabNavigator;
