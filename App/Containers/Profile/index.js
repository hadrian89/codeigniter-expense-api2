import React from "react";

import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  TextInput,
  ImageBackground,
  ScrollView,
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
import { updateProfile, getProfile } from "../Profile/actions";
import { actionLogout } from "../Login/actions";

import styles from "../../style";
const remote = require("../../../assets/images/login-bg.jpg");

import {
  makeSelectProfileSuccessResp,
  makeSelectProfileErrorResp,
  makeSelectProfileApiLoading,
  makeSelectGetProfileData
} from "../Profile/selectors";

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function validate(formProps) {
  let alldata = JSON.parse(JSON.stringify(formProps));
  const errors = {};

  if (!alldata.form_firstname) {
    errors.form_firstname = "Please enter First Name";
  }

  if (!alldata.form_lastname) {
    errors.form_lastname = "Please enter Last Name";
  }
  if (!alldata.form_email) {
    errors.form_email = "Please enter Email ID";
  }
  if (!alldata.form_pan) {
    errors.form_pan = "Please enter PAN";
  }
  return errors;
}

class Profile extends React.Component {
  static navigationOptions = {
    title: "Update Profile"
  };
  constructor() {
    super();
    this.state = {};
    this.actionLogout = this.actionLogout.bind(this);
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
          this.props.dispatchUpdateProfile(values);
        }
      });

    return false;
  };

  componentDidMount() {
    this.props.dispatchProfileData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile !== this.props.profile && this.props.profile) {
      this.props.changeFieldValue(
        "form_firstname",
        this.props.profile.firstname
      );
      this.props.changeFieldValue("form_lastname", this.props.profile.lastname);
      this.props.changeFieldValue("form_email", this.props.profile.email);
      this.props.changeFieldValue("form_dob", this.props.profile.dob);
      this.props.changeFieldValue("form_pan", this.props.profile.pan);
    }
  }

  actionLogout() {
    this.props.dispatchLogout();
    this.props.navigation.navigate("Login");
  }

  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <ScrollView>
        <ImageBackground source={remote} style={styles.backgroundImage}>
          <View style={[styles.container]}>
            {loading && (
              <View style={styles.modalBackground}>
                <View style={styles.activityLoading}>
                  <ActivityIndicator size="large" />
                </View>
              </View>
            )}
            <Text>&nbsp; </Text>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_firstname"
                placeholder="Enter First Name"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_lastname"
                placeholder="Enter Last Name"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_email"
                placeholder="Enter Email ID"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_dob"
                placeholder="Enter DOB"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_pan"
                placeholder="Enter PAN"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.buttonContainer]}>
              <Button
                title="Update"
                full
                rounded
                success
                onPress={handleSubmit(this.onSaveContinue)}
                style={[styles.buttonPrimary]}
              ></Button>
            </View>

            <View style={[styles.buttonContainer]}>
              <Button
                title="Logout"
                full
                rounded
                success
                onPress={this.actionLogout}
                style={[styles.buttonPrimary]}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  success: makeSelectProfileSuccessResp(),
  error: makeSelectProfileErrorResp(),
  loading: makeSelectProfileApiLoading(),
  profile: makeSelectGetProfileData()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogout: () => dispatch(actionLogout()),
    dispatchProfileData: () => dispatch(getProfile()),
    dispatchUpdateProfile: (val) => dispatch(updateProfile(val)),
    changeFieldValue: function(field, value) {
      dispatch(change(form, field, value));
    }
  };
}

const form = "profileForm";

Profile = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(Profile);

const selector = formValueSelector(form);
Profile = connect(state => {
  const form_firstname = selector(state, "form_firstname");
  const form_lastname = selector(state, "form_lastname");
  const form_email = selector(state, "form_email");
  const form_dob = selector(state, "form_dob");
  const form_pan = selector(state, "form_pan");
  return {
    form_firstname,
    form_lastname,
    form_email,
    form_dob,
    form_pan
  };
})(Profile);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
