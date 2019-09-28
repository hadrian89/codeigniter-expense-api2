import React, { Component } from "react";
import {
  View,
  Button,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Text,
  StyleSheet,
  Picker,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PureChart from "react-native-pure-chart";
import moment from "moment";
const remote = require("../../../assets/images/login-bg.jpg");
import styles from "../../style";
import { Ionicons, Entypo } from "@expo/vector-icons";

import { getIncome } from "../Income/actions";
import {
  makeSelectIncomeApiLoading,
  makeSelectIncomeList
} from "../Income/selectors";

import { getCard } from "../CreditCard/actions";
import {
  makeSelectCardApiLoading,
  makeSelectCardList
} from "../CreditCard/selectors";

import { getCardEmi } from "../CreditCardEmi/actions";
import {
  makeSelectCardEmiApiLoading,
  makeSelectCardEmiList
} from "../CreditCardEmi/selectors";

import { getCardBill } from "../CreditCardBill/actions";
import {
  makeSelectCardBillApiLoading,
  makeSelectCardBillList
} from "../CreditCardBill/selectors";

// import YearMonthPicker from "../../Components/yearMonthPicker";
// const Screen = Dimensions.get("window");
import MonthSelectorCalendar from "react-native-month-selector"; //add this import line

class Dashboard extends Component {
  static navigationOptions = {
    title: "Dashboard"
  };
  constructor(props) {
    super(props);
    this.generateData = this.generateData.bind(this);
    this.state = {
      data: [],
      pieData: [],
      display: false,
      month: moment(),
      monthPicker: false
    };
  }

  generateData() {
    var data = [
      { x: "1", y: 300 },
      { x: "2", y: null },
      { x: "2", y: null },
      { x: "3", y: null },
      { x: "4", y: 400 }
    ];
    var pieData = [];
    var startDate = moment();

    for (var i = 0; i < 10; i++) {
      startDate.add(1, "days");
      data.push({
        x: startDate.format("YYYY-MM-DD"),
        y: Math.round(Math.random() * 500)
      });
    }

    for (let i = 0; i < 5; i++) {
      pieData.push({
        value: Math.round(Math.random() * 500),
        label: "Marketing"
      });
    }

    this.setState({
      data: [
        {
          seriesName: "test2",
          data: data.slice(),
          color: "#0e95de"
        }
      ],
      pieData: pieData,
      display: true
    });
  }

  componentDidMount() {
    this.generateData();
    this.props.dispatchIncome();
    this.props.dispatchCards();
    this.props.dispatchCardEMI();
    this.props.dispatchCardBill();
  }

  onSelectMonth = date => {
    this.setState({ month: date })
    this.onChangeMonth();
  }
  onChangeMonth = val => {
    this.setState({
      monthPicker: !this.state.monthPicker
    });
  };
  render() {
    //https://github.com/oksktank/react-native-pure-chart/blob/master/examples/App.js
    //slary vs emi vs cc bill pie chart
    //each cc last 3 bills bar chart
    //each emi individual pie chart
    //filter on month
    console.log(this.props.all_income, "all_income");
    console.log(this.props.all_cards, "all_cards");
    console.log(this.props.all_bills, "all_bills");
    console.log(this.props.all_emis, "all_emis");
    const {
      card_loading,
      bill_loading,
      emi_loading,
      income_loading
    } = this.props;

    if (card_loading || bill_loading || emi_loading || income_loading) {
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

    //console.log(this.state.month,'this.state.month')

    return (
      <ImageBackground source={remote} style={styles.backgroundImage}>
        <ScrollView>
          <Button
            block
            onPress={() => this.props.navigation.navigate("CreditCardList")}
            title="Go to Credit Card List"
            success
          ></Button>

          <Card style={{ padding: 0, margin: 0 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={[styles.leftRightMonthIcon]}>
                <Entypo
                  name="chevron-left"
                  size={40}
                  style={{ padding: 3 }}
                  color="white"
                />
              </View>
              <View style={{ width: "60%" }}>
                <Text
                  style={[styles.monthDisplay]}
                  onPress={this.onChangeMonth}
                >
                  {this.state.month && this.state.month.format("MMM YYYY")}
                </Text>
              </View>
              <View style={[styles.leftRightMonthIcon]}>
                <Entypo
                  name="chevron-right"
                  size={40}
                  style={{ padding: 3 }}
                  color="white"
                />
              </View>
            </View>
            {this.state.monthPicker && (
              <MonthSelectorCalendar
                selectedDate={this.state.month}
                // containerStyle={{
                //   alignSelf: "stretch",
                //   width: "100%"
                // }}
                onMonthTapped={this.onSelectMonth}
              />
            )}
          </Card>

          <View>
            {this.state.display && (
              <View>
                <Card title="HSBC Credit Card">
                  <PureChart
                    type={"bar"}
                    data={this.state.data}
                    height={100}
                    xAxisColor={"green"}
                    yAxisColor={"green"}
                    xAxisGridLineColor={"green"}
                    yAxisGridLineColor={"green"}
                    labelColor={"green"}
                    numberOfYAxisGuideLine={10}
                  />
                </Card>
                <Card title="CARD WITH DIVIDER">
                  <PureChart type={"line"} data={this.state.data} />
                </Card>
                <Card title="CARD WITH DIVIDER">
                  <PureChart type={"bar"} data={this.state.data} />
                </Card>
                <Card title="CARD WITH DIVIDER">
                  <PureChart type={"pie"} data={this.state.pieData} />
                </Card>
              </View>
            )}

            {/* <Button
            style={{ marginTop: 20 }}
            title="Generate chart data"
            onPress={this.generateData}
          >
            <Text>Generate chart data</Text>
          </Button> */}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styleDashboard = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  showPickerBtn: {
    height: 44,
    backgroundColor: "#973BC2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 6
  },
  yearMonthText: {
    fontSize: 20,
    marginTop: 12
  }
});

const mapStateToProps = createStructuredSelector({
  income_loading: makeSelectIncomeApiLoading(),
  card_loading: makeSelectCardApiLoading(),
  bill_loading: makeSelectCardBillApiLoading(),
  emi_loading: makeSelectCardEmiApiLoading(),
  all_income: makeSelectIncomeList(),
  all_cards: makeSelectCardList(),
  all_bills: makeSelectCardBillList(),
  all_emis: makeSelectCardEmiList()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchIncome: () => dispatch(getIncome()),
    dispatchCards: () => dispatch(getCard()),
    dispatchCardBill: () => dispatch(getCardBill()),
    dispatchCardEMI: () => dispatch(getCardEmi())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
