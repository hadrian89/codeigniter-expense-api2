import React from "react";

import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  TextInput,
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
import { actionRegister } from "./actions";

import styles from "../../style";
const remote = require("../../../assets/images/login-bg.jpg");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

import {
  makeSelectRegisterLoading,
  makeSelectRegisterResponse
} from "./selectors";

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
  if (!alldata.form_login_mobile) {
    errors.form_login_mobile = "Please enter mobile";
  }
  return errors;
}

class RegistrationScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {};

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
          this.props.dispatchRegister(
            values.form_login_username,
            values.form_login_password,
            values.form_login_mobile
          );
        }
      });

    return false;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.response != this.props.response && this.props.response) {
      this.props.navigation.navigate("Login");
    }
  }

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
          <Text style={styles.loginRegSubText}>Registration</Text>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_login_username"
              placeholder="Enter Username"
              style={[styles.input]}
            />
          </View>

          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_login_password"
              placeholder="Enter Password"
              type="password"
              style={[styles.input]}
            />
          </View>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_login_mobile"
              placeholder="Enter Mobile"
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
  response: makeSelectRegisterResponse(),
  loading: makeSelectRegisterLoading()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchRegister: (username, email, phone) =>
      dispatch(actionRegister(username, email, phone))
  };
}

const form = "RegistrationScreenForm";

RegistrationScreen = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(RegistrationScreen);

const selector = formValueSelector(form);
RegistrationScreen = connect(state => {
  const form_login_username = selector(state, "form_login_username");
  const form_login_password = selector(state, "form_login_password");
  const form_login_email = selector(state, "form_login_email");
  const form_login_mobile = selector(state, "form_login_mobile");
  return {
    form_login_username,
    form_login_password,
    form_login_email,
    form_login_mobile
  };
})(RegistrationScreen);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationScreen);
