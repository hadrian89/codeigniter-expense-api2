import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "./TabBarIcon";

import RegistrationScreen from "../Registration/RegistrationScreen";
import LoginScreen from "../Login/LoginScreen";

import Dashboard from "../Dashboard/index";
import CreditCardList from "../CreditCard/index";
import CreditCardForm from "../CreditCard/form";

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
          : "md-information-circle"
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
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

RegistrationStack.path = "";

const DashboardStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    CreditCardList: CreditCardList,
    CreditCardForm: CreditCardForm,
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarLabel: "Dashboard",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

DashboardStack.path = "";

const tabNavigator = createBottomTabNavigator({
  DashboardStack,
  LoginStack,
  RegistrationStack
});

tabNavigator.path = "";

export default tabNavigator;
