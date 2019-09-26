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
      typeof this.props.userid != "undefined" && this.props.token && this.props.userid
    ) {
      return <AppNavigator />;
    } else {
      return <AppNavigator />;
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
