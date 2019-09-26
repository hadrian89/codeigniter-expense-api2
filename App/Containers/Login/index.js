import React from "react";

import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Button, Input, ThemeProvider } from "react-native-elements";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError
} from "redux-form";

import { createStructuredSelector } from "reselect";
import { actionLogin, getUserId } from "./actions";

import styles from "../../style";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

import {
  makeSelectToken,
  makeSelectUserId,
  makeSelectLoginLoading,
  makeSelectLoginError
} from "./selectors";

const remote = require("../../../assets/images/login-bg.jpg");

const renderInput = ({
  type,
  input: { onChange, ...restInput },
  style,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <View>
      <TextInput
        type={type}
        style={style}
        onChangeText={onChange}
        {...restInput}
        placeholder={placeholder}
      />
      {touched && error && <Text style={[styles.inputErr]}>{error}</Text>}
    </View>
  );
};

const theme = {
  // Button: {
  //   titleStyle: {
  //     color: 'red',
  //   },
  // },
};

function validate(formProps) {
  let alldata = JSON.parse(JSON.stringify(formProps));
  const errors = {};

  if (!alldata.form_login_username) {
    errors.form_login_username = "Please enter username";
  }

  if (!alldata.form_login_password) {
    errors.form_login_password = "Please enter password";
  }
  return errors;
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {};

  componentWillReceiveProps(prevProps) {
    //console.log(prevProps,this.props,'bnm')
    if (prevProps.respError != this.props.respError) {
      //console.log(prevProps.respError,this.props.respError,'this.props.respError')
      Alert.alert(
        'Alert',
        prevProps.respError,
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      
    }
    if (prevProps.token != this.props.token) {
      this.props.dispatchUserId(
        this.props.form_login_username,
        this.props.form_login_password
      );
    }
    // if ((prevProps.userid != this.props.userid) && this.props.userid > 0) {
    //   console.log(this.props.userid, "this.props.userid");
    //   // this.props.navigation.navigate("Dashboard")
    // }
  }

  onSaveContinue = values => {
    return sleep(10)
      .then(() => {
        return validate(values, this.props);
      })
      .then(errors => {
        let countErr = Object.keys(errors).length;
        if (countErr > 0) {
          throw new SubmissionError(errors);
        } else {
          this.props.dispatchLogin(
            values.form_login_username,
            values.form_login_password
          );
        }
      });

    return false;
  };

  render() {
    const { handleSubmit, loading } = this.props;

    return (
      <ImageBackground source={remote} style={styles.backgroundImage}>
        <View style={[styles.container]}>
          {loading && (
            <View style={styles.modalBackground}>
              <View style={styles.activityLoading}>
                <ActivityIndicator size="large" />
              </View>
            </View>
          )}

          <Text style={styles.loginRegText}>Ex-Tick</Text>
          <Text style={styles.loginRegSubText}>Login</Text>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_login_username"
              placeholder="Enter Username"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              style={[styles.input]}
            />
          </View>

          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_login_password"
              placeholder="Enter Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              type="password"
              style={[styles.input]}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <Button
              title="Submit"
              full
              rounded
              success
              onPress={handleSubmit(this.onSaveContinue)}
              style={[styles.buttonPrimary]}
            >
              <Text>Submit</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  userid: makeSelectUserId(),
  loading: makeSelectLoginLoading(),
  respError: makeSelectLoginError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: (username, pass) => dispatch(actionLogin(username, pass)),
    dispatchUserId: (username, pass) => dispatch(getUserId(username, pass))
  };
}

const form = "loginScreenForm";

LoginScreen = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(LoginScreen);

const selector = formValueSelector(form);
LoginScreen = connect(state => {
  const form_login_username = selector(state, "form_login_username");
  const form_login_password = selector(state, "form_login_password");
  return {
    form_login_username,
    form_login_password
  };
})(LoginScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
