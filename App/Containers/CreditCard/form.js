import React from "react";

import { connect } from "react-redux";
import { Text, View, TouchableOpacity, Picker } from "react-native";

import { Button, Input } from "react-native-elements";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError
} from "redux-form";

import { createStructuredSelector } from "reselect";
import { addCard, updateCard } from "./actions";
import {
  makeSelectCardNo,
  makeSelectCardBank,
  makeSelectCardLimit
} from "./selectors";
import styles from "../../style";

const renderInput = ({
  type,
  input: { onChange, ...restInput },
  meta: { touched, error }
}) => {
  return (
    <View>
      <Input type={type} onChangeText={onChange} {...restInput} />
      {touched && error && <Text>{error}</Text>}
    </View>
  );
};

const renderPicker = ({
  input: { onChange, value, ...inputProps },
  children,
  meta: { touched, error },
  ...pickerProps
}) => (
  <View>
    <Picker
      selectedValue={value}
      onValueChange={value => onChange(value)}
      {...inputProps}
      {...pickerProps}
    >
      {children}
    </Picker>
    {touched && error && <Text>{error}</Text>}
  </View>
);
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

class AddCreditCard extends React.Component {
  static navigationOptions = {
    title: "Add Credit Card"
  };
  state = {
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

  onSaveContinue = values => {
    return sleep(10)
      .then(() => {
        return validate(values, this.props);
      })
      .then(errors => {
        console.log(errors, "errors");
        let countErr = Object.keys(errors).length;
        if (countErr > 0) {
          throw new SubmissionError(errors);
        } else {
          console.log("success");
          //this.launchModelPopup();
          // this.props.addNewCard();
        }
      });

    return false;
  };

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.cardid
    ) {
      this.props.changeFieldValue('form_cc_no', this.props.navigation.state.params.cardid.card_number);
      this.props.changeFieldValue('form_cc_bank', this.props.navigation.state.params.cardid.bank_name);
      this.props.changeFieldValue('form_cc_limit', this.props.navigation.state.params.cardid.credit_limit);
    }
  }

  render() {
    const { form_cc_limit, handleSubmit } = this.props;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
          marginRight: 40,
          paddingHorizontal: 10
        }}
      >
        <Field
          component={renderInput}
          name="form_cc_no"
          placeholder="Enter Card Number"
          type="number"
          keyboardType="numeric"
        />

        <Field
          name="form_cc_bank"
          component={renderPicker}
          iosHeader="Select one"
          mode="dropdown"
          style={[styles.select]}
        >
          <Picker.Item key={-1} value={0} label="Select Card" />
          {this.state.cardOptions.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />;
          })}
        </Field>

        <Field
          component={renderInput}
          name="form_cc_limit"
          placeholder="Enter Credit Limit"
          type="number"
          keyboardType="numeric"
        />

        <Button
          title="Save and Continue"
          full
          rounded
          success
          onPress={handleSubmit(this.onSaveContinue)}
          style={{ marginTop: 10, marginRight: 10 }}
        >
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  form_card_no: makeSelectCardNo(),
  form_card_bank: makeSelectCardBank(),
  form_card_limit: makeSelectCardLimit()
});

export function mapDispatchToProps(dispatch) {
  return {
    addNewCard: () => dispatch(addCard()),
    dispatchUpdateCard: val => updateCard(val),
    changeFieldValue: function(field, value) {
      dispatch(change(form, field, value));
    }
  };
}

const form = "creditCardForm";

AddCreditCard = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(AddCreditCard);

const selector = formValueSelector(form);
AddCreditCard = connect(state => {
  const form_cc_no = selector(state, "form_cc_no");
  const form_cc_bank = selector(state, "form_cc_bank");
  const form_cc_limit = selector(state, "form_cc_limit");
  return {
    form_cc_no,
    form_cc_bank,
    form_cc_limit
  };
})(AddCreditCard);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCard);
