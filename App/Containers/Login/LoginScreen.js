import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: "",
    password: "",
    accessCode: ""
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  signIn() {
    const { username, password } = this.state;
    this.setState({
      username
    });
    this.props.navigation.navigate("Home");
  }

  confirm() {
    const { authCode } = this.state;
  }

  render() {
    // const { fontsLoaded } = this.state
    const {
      signInErrorMessage,
      isAuthenticating,
      signInError,
      showSignInConfirmationModal
    } = this.props;
    return (
      <View>
        <Text>ss</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  // dispatchConfirmUserLogin: authCode => confirmUserLogin(authCode),
  // dispatchAuthenticate: (username, password) => authenticate(username, password)
};

const mapStateToProps = state => ({
  // auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
