import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { getToken } from "./actions";
import { withTheme } from "react-native-elements";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  makeSelectToken,
} from "./selectors";
import {
  getUserId,
} from "./actions";

class Dashboard extends Component {
  static navigationOptions = {
    title: "Dashboard"
  };

  componentDidMount() {
    this.props.dispatchToken();
  }

  componentWillReceiveProps(prevProps){
      if(prevProps.token != this.props.token){
        this.props.dispatchUserId();
      }
  }

  render() {
    return (
      <View>
        <Button
          block
          onPress={() => this.props.navigation.navigate("CreditCardList")}
          title="Go to Credit Card"
          success
        ></Button>
      </View>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  token: makeSelectToken()
});

const mapDispatchToProps = {
   dispatchToken: () => getToken('dodi','dodi123'),
   dispatchUserId: () => getUserId('dodi','dodi123')
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Dashboard));