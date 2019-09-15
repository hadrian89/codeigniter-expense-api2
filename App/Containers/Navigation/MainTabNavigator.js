import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "./TabBarIcon";

import SavingsScreen from "../Savings/index";
import ProfileScreen from "../Profile/index";
import EMIScreen from "../EMI/index";
import CCBillScreen from "../CreditCardBill/index";

import Dashboard from "../Dashboard/index";
import CreditCardList from "../CreditCard/index";
import CreditCardForm from "../CreditCard/form";

const config = Platform.select({
  web: { headerMode: "screen" }
});

const CCBillStack = createStackNavigator(
  {
    CCBill: CCBillScreen
  },
  config
);

CCBillStack.navigationOptions = {
  tabBarLabel: "CCBill",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "calculator"}
    />
  )
};

CCBillStack.path = "";

const EMIStack = createStackNavigator(
  {
    EMI: EMIScreen
  },
  config
);

EMIStack.navigationOptions = {
  tabBarLabel: "EMI",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "credit-card"}
    />
  )
};

EMIStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "add-user"
      }
    />
  )
};

ProfileStack.path = "";

const SavingsStack = createStackNavigator(
  {
    Savings: SavingsScreen
  },
  config
);

SavingsStack.navigationOptions = {
  tabBarLabel: "Savings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "grid"}
    />
  )
};

SavingsStack.path = "";

const DashboardStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    CreditCardList: CreditCardList,
    CreditCardForm: CreditCardForm
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarLabel: "Dashboard",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "area-graph"}
    />
  )
};

DashboardStack.path = "";

const tabNavigator = createBottomTabNavigator({
  DashboardStack,
  SavingsStack,
  EMIStack,
  CCBillStack,
  ProfileStack,
});

tabNavigator.path = "";

export default tabNavigator;
