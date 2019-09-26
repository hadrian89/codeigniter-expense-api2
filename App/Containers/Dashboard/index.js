import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { withTheme } from "react-native-elements";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PureChart from "react-native-pure-chart";
import moment from "moment";

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
      display: false
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

  componentDidMount(){
    this.generateData();
  }

  render() {
    //https://github.com/oksktank/react-native-pure-chart/blob/master/examples/App.js
    return (
      <ScrollView>
        <Button
          block
          onPress={() => this.props.navigation.navigate("CreditCardList")}
          title="Go to Credit Card"
          success
        ></Button>

        <View>
          {this.state.display && (
            <View style={{ padding: 20, marginTop: 100 }}>
              <PureChart
                type={"bar"}
                data={this.state.data}
                height={100}
                xAxisColor={"red"}
                yAxisColor={"red"}
                xAxisGridLineColor={"red"}
                yAxisGridLineColor={"red"}
                labelColor={"red"}
                numberOfYAxisGuideLine={10}
              />
              <PureChart type={"line"} data={this.state.data} />
              <PureChart type={"bar"} data={this.state.data} />
              <PureChart type={"pie"} data={this.state.pieData} />
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
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // token: makeSelectToken()
});

const mapDispatchToProps = {
  //  dispatchToken: () => getToken('abhinav','abhinav'),
  //  dispatchUserId: () => getUserId('abhinav','abhinav')
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Dashboard));
