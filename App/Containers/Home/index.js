import React from "react";
import { connect } from "react-redux";
import AppNavigator from "../Navigation/AppNavigator";
import AppNavigators from "../Navigation/AppNavigators";
import { createStructuredSelector } from "reselect";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

class HomeScreen extends React.Component {
  render() {
    if (
      typeof this.props.token != "undefined" &&
      typeof this.props.userid != "undefined"
    ) {
      return <AppNavigator />;
    } else {
      return <AppNavigators />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  userid: makeSelectUserId()
});

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
