import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { withTheme } from "react-native-elements";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Dashboard extends Component {
  static navigationOptions = {
    title: "Dashboard"
  };

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