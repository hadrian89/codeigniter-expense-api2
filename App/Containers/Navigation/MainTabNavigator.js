import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "./TabBarIcon";

import Dashboard from "../Dashboard/index";
// import SavingsScreen from "../Savings/index";
import ProfileScreen from "../Profile/index";

import EMIList from "../EMI/index";
import EMIForm from "../EMI/form";
import CCBillList from "../CreditCardBill/index";
import CCBillForm from "../CreditCardBill/form";

import CreditCardList from "../CreditCard/index";
import CreditCardForm from "../CreditCard/form";

const config = Platform.select({
  web: { headerMode: "screen" }
});

const CCBillStack = createStackNavigator(
  {
    CCBill: CCBillList,
    AddCCBill:CCBillForm
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
    EMI: EMIList,
    AddEMI: EMIForm,
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

// const SavingsStack = createStackNavigator(
//   {
//     Savings: SavingsScreen
//   },
//   config
// );

// SavingsStack.navigationOptions = {
//   tabBarLabel: "Savings",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-link" : "grid"}
//     />
//   )
// };

// SavingsStack.path = "";

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
  //SavingsStack,
  EMIStack,
  CCBillStack,
  ProfileStack,
});

tabNavigator.path = "";

export default tabNavigator;
