import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
const remote = require("../../../assets/images/login-bg.jpg");

import styles from "../../style";

import { ListItem } from "react-native-elements";
import { createStructuredSelector } from "reselect";
import { getIncome } from "./actions";
import { makeSelectIncomeList, makeSelectIncomeApiLoading } from "./selectors";

class Income extends React.Component {
  static navigationOptions = {
    title: "Income List"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      notFound: "Income not found.\nPlease click (Add income) button to add it."
    };
    this.editIncome = this.editIncome.bind(this);
  }
  componentDidMount() {
  //  this.props.dispatchGetIncome();
  }

  componentWillReceiveProps(prevProps) {
    if (
      prevProps.navigation.state.params != this.props.navigation.state.params
    ) {
      if (
        prevProps.navigation.state.params &&
        prevProps.navigation.state.params.reload
      ) {
        this.props.dispatchGetIncome();
      }
    }
  }

  editIncome(id) {
    let allincomes = this.props.income_list;
    let incomedetail = [];
    if (typeof allincomes !== "undefined") {
      if (allincomes.length > 0) {
        allincomes.map(function(v, k) {
          if (v.id === id) {
            incomedetail = v;
          }
        });
      }
    }
    this.props.navigation.navigate("IncomeForm", { incomeid: incomedetail });
  }


  render() {
    let incomes_image = [];
    let allincomes = this.props.income_list;
    if (typeof allincomes === "undefined") {
      return (
        <View>
          <Text>Error fetching in income list.</Text>
          <Button
            block
            title="Go to Dashboard"
            onPress={() => this.props.navigation.navigate("Dashboard")}
            success
          >
            <Text> Add Incomes </Text>
          </Button>
        </View>
      );
    } else {
      if (allincomes.length > 0) {
        allincomes.map(function(v, k) {
          incomes_image.push({
            id: v.id,
            name: v.salary_date,
           // avatar_url: require("../../../assets/images/" .concat(v.bank_name.toLowerCase()).concat(".jpg")),
            subtitle: "Salary Inhand: " + v.net_income
          });
        });
      }
    }

    function WebTouchableHighlight({ children, ...props }: any) {
      return (
        <TouchableHighlight {...props}>
          <View>{children}</View>
        </TouchableHighlight>
      );
    }

    const SafeTouchableHighlight =
      Platform.OS === "web" ? WebTouchableHighlight : TouchableHighlight;

    const { loading } = this.props;

    if (loading) {
      return (
        <View style={[styles.container]}>
          <View style={styles.modalBackground}>
            <View style={styles.activityLoading}>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </View>
      );
    }
    return (
      <ImageBackground source={remote} style={styles.backgroundImage}>
        <ScrollView>
          <Button
            block
            title="Add Income"
            onPress={() => this.props.navigation.navigate("IncomeForm")}
            success
          >
            <Text> Add Incomes </Text>
          </Button>
          {incomes_image.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
            //  leftAvatar={{ source: { uri: l.avatar_url } }}
              subtitle={l.subtitle}
              bottomDivider
              button
              onPress={() => this.editIncome(l.id)}
              Component={SafeTouchableHighlight}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  income_list: makeSelectIncomeList(),
  loading: makeSelectIncomeApiLoading()
});
const mapDispatchToProps = {
  dispatchGetIncome: () => getIncome()
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Income);
