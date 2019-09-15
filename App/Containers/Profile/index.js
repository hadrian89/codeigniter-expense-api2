import React from "react";

import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  TextInput,
  ImageBackground,
  ScrollView
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
import { addCard, updateCard, removeCard } from "../CreditCard/actions";
import { actionLogout } from "../Login/actions";

import styles from "../../style";
const remote = require("../../../assets/images/login-bg.jpg");

import {
  makeSelectCardSuccessResp,
  makeSelectCardErrorResp
} from "../CreditCard/selectors";

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

const renderPicker = ({
  input: { onChange, value, ...inputProps },
  children,
  style,
  styleErr,
  meta: { touched, error },
  ...pickerProps
}) => (
  <View>
    <Picker
      selectedValue={value}
      style={style}
      onValueChange={value => onChange(value)}
      {...inputProps}
      {...pickerProps}
    >
      {children}
    </Picker>
    {touched && error && <Text style={[styles.inputErr]}>{error}</Text>}
  </View>
);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  if (!alldata.form_cc_no) {
    errors.form_cc_no = "Please enter credit card number";
  }
  // else if (alldata.form_cc_no) {
  //   if (alldata.form_cc_no.length != 12) {
  //     errors.form_cc_no = "Please enter 17 digit credit card number";
  //   }
  // }

  if (!alldata.form_cc_bank) {
    errors.form_cc_bank = "Please select credit card bank";
  }

  if (!alldata.form_cc_limit) {
    errors.form_cc_limit = "Please enter credit limit";
  }
  // else if (alldata.form_cc_limit) {
  //   if (alldata.form_cc_limit.length != 17) {
  //     errors.form_cc_limit = "Please enter 17 digit credit limit";
  //   }
  // }
  return errors;
}

class Profile extends React.Component {
  static navigationOptions = {
    title: "Add Credit Card"
  };
  constructor() {
    super();
    this.state = {
      cardOptions: [
        "HSBC",
        "HDFC",
        "SBI",
        "ICICI",
        "BOB",
        "AMEX",
        "SCA",
        "PNB",
        "KOTAK"
      ]
    };
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
          if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.cardid
          ) {
            this.props.dispatchUpdateCard(
              this.props.navigation.state.params.cardid.id,
              values
            );
          } else {
            this.props.addNewCard(values);
          }
        }
      });

    return false;
  };

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.cardid
    ) {
      this.props.changeFieldValue(
        "form_cc_no",
        this.props.navigation.state.params.cardid.card_number
      );
      this.props.changeFieldValue(
        "form_cc_bank",
        this.props.navigation.state.params.cardid.bank_name
      );
      this.props.changeFieldValue(
        "form_cc_limit",
        this.props.navigation.state.params.cardid.credit_limit
      );
      this.props.changeFieldValue(
        "form_cc_available_limit",
        this.props.navigation.state.params.cardid.available_limit
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.success != this.props.success && this.props.success) {
      this.props.navigation.navigate("CreditCardList");
    }

    if (prevProps.error != this.props.error && this.props.error) {
      console.log(this.props.error, "this.props.error");
    }
  }

  removeCard = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.cardid
    ) {
      this.props.dispatchRemoveCard(
        this.props.navigation.state.params.cardid.id
      );
    }
  };

  actionLogout() {
    this.props.dispatchLogout();
    this.props.navigation.navigate("Login");
  }

  render() {
    const { handleSubmit } = this.props;
    let removeHtml;
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.cardid
    ) {
      //removeHtml= <Ionicons name="md-remove-circle"  onPress={() => this.removeCard()} size={32} color="red" />
      removeHtml = (
        <Button
          block
          title="Remove this Card"
          onPress={() => this.removeCard()}
          buttonStyle={[{ backgroundColor: "red" }]}
          style={[styles.buttonDanger]}
        ></Button>
      );
    }
    return (
      // <ScrollView>
      <ImageBackground source={remote} style={styles.backgroundImage}>
        <View style={[styles.container]}>
          {/* {loading && (
            <View style={styles.modalBackground}>
              <View style={styles.activityLoading}>
                <ActivityIndicator size="large" />
              </View>
            </View>
          )} */}
          <Text>&nbsp; </Text>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_cc_no"
              placeholder="Enter Card Number"
              type="number"
              keyboardType="numeric"
              style={[styles.input]}
            />
          </View>
          <View style={[styles.inputItem]}>
            <Field
              name="form_cc_bank"
              component={renderPicker}
              mode="dropdown"
              style={[styles.select]}
            >
              <Picker.Item key={-1} value={0} label="Select Card" />
              {this.state.cardOptions.map((s, i) => {
                return <Picker.Item key={i} value={s} label={s} />;
              })}
            </Field>
          </View>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_cc_limit"
              placeholder="Enter Credit Limit"
              type="number"
              keyboardType="numeric"
              style={[styles.input]}
            />
          </View>
          <View style={[styles.inputItem]}>
            <Field
              component={renderInput}
              name="form_cc_available_limit"
              placeholder="Enter Available Credit Limit"
              type="number"
              keyboardType="numeric"
              style={[styles.input]}
            />
          </View>
          <View style={[styles.buttonContainer]}>
            <Button
              title="Save and Continue"
              full
              rounded
              success
              onPress={handleSubmit(this.onSaveContinue)}
              style={[styles.buttonPrimary]}
            >
              <Text>Submit</Text>
            </Button>
          </View>
          <View style={[styles.buttonContainer]}>{removeHtml}</View>

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
      // </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  success: makeSelectCardSuccessResp(),
  error: makeSelectCardErrorResp()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLogout: () => dispatch(actionLogout()),
    addNewCard: val => dispatch(addCard(val)),
    dispatchUpdateCard: (id, val) => dispatch(updateCard(id, val)),
    dispatchRemoveCard: id => dispatch(removeCard(id)),
    changeFieldValue: function(field, value) {
      dispatch(change(form, field, value));
    }
  };
}

const form = "creditCardForm";

Profile = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(Profile);

const selector = formValueSelector(form);
Profile = connect(state => {
  const form_cc_no = selector(state, "form_cc_no");
  const form_cc_bank = selector(state, "form_cc_bank");
  const form_cc_limit = selector(state, "form_cc_limit");
  const form_cc_available_limit = selector(state, "form_cc_available_limit");
  return {
    form_cc_no,
    form_cc_bank,
    form_cc_limit,
    form_cc_available_limit
  };
})(Profile);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
