import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import styles from "../../style";
const remote = require("../../../assets/images/login-bg.jpg");
import { CREDIT_CARD_BANKS } from "../../utils/constants";

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

import { Button, Input, ThemeProvider } from "react-native-elements";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  SubmissionError
} from "redux-form";

import {
  getCardDetail,
  addCardBill,
  updateCardBill,
  removeCardBill
} from "./actions";

import {
  makeSelectCardList
} from "../CreditCard/selectors";

import {
  makeSelectCardBillSuccessResp,
  makeSelectCardBillErrorResp,
  makeSelectCardBillApiLoading,
  makeSelectUserAllCards,
  makeSelectCardDetails
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

function validate(formProps) {
  let alldata = JSON.parse(JSON.stringify(formProps));
  const errors = {};

  if (!alldata.form_bill_date) {
    errors.form_bill_date = "Please enter bill date";
  }

  if (!alldata.form_bill_bank) {
    errors.form_bill_bank = "Please select bank";
  }

  if (!alldata.form_bill_amount) {
    errors.form_bill_amount = "Please enter bill amount";
  }
  if (!alldata.form_bill_due_date) {
    errors.form_bill_due_date = "Please enter due date";
  }
  if (!alldata.form_bill_min_due) {
    errors.form_bill_min_due = "Please enter min amount";
  }

  return errors;
}

class AddCreditCardBill extends React.Component {
  static navigationOptions = {
    title: "Add Credit Card Bill"
  };
  constructor(props) {
    super(props);
    this.onBankCardChange = this.onBankCardChange.bind(this);
    // console.log(CREDIT_CARD_BANKS, "CREDIT_CARD_BANKS");
    this.state = {
      cardOptions: []
    };
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
            this.props.navigation.state.params.billid
          ) {
            this.props.dispatchUpdateCardBill(
              this.props.navigation.state.params.billid.id,
              values
            );
          } else {
            this.props.addNewCardBill(values);
          }
        }
      });

    return false;
  };

  componentWillMount() {
    this.formatCards();
  }

  formatCards = () => {
    let allcards = this.props.cards;
    let cardsArr = [];

    if (allcards) {
      allcards.map(function(v, k) {
        if (typeof v != "undefined") {
          let cards = {
            id: v.id,
            value: v.bank_name
          };
          cardsArr.push(cards);
        }
      });
      this.setState({
        cardOptions: cardsArr
      });
    }
    setTimeout(
      function() {
        this.populateValuesInEditMode();
      }.bind(this),
      200
    );
  };

  populateValuesInEditMode = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.billid
    ) {
      this.props.changeFieldValue(
        "form_bill_date",
        this.props.navigation.state.params.billid.bill_date
      );
      this.props.changeFieldValue(
        "form_bill_bank",
        this.props.navigation.state.params.billid.card_id
      );
      this.props.changeFieldValue(
        "form_bill_amount",
        this.props.navigation.state.params.billid.total_amnt
      );
      this.props.changeFieldValue(
        "form_bill_min_due",
        this.props.navigation.state.params.billid.min_due
      );
      this.props.changeFieldValue(
        "form_bill_due_date",
        this.props.navigation.state.params.billid.due_date
      );
    }
  };

  componentDidUpdate(prevProps) {
    // if (prevProps.cards != this.props.cards && this.props.cards) {
    //   this.formatCards();
    // }
    if (prevProps.success != this.props.success && this.props.success) {
      this.props.navigation.navigate("CreditCardList", { reload: true });
    }

    // if (prevProps.error != this.props.error && this.props.error) {
    //   console.log(this.props.error, "this.props.error");
    // }

    if (
      prevProps.carddetail !== this.props.carddetail &&
      this.props.carddetail
    ) {
      this.props.changeFieldValue(
        "form_bill_due_date",
        this.props.carddetail.due_date
      );
    }
  }

  removeCardBill = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.billid
    ) {
      this.props.dispatchRemoveCardBill(
        this.props.navigation.state.params.billid.id
      );
    }
  };

  onBankCardChange(value) {
    this.props.dispatchCardDetail(value);
  }

  render() {
    const { handleSubmit, loading } = this.props;

    let removeHtml;
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.billid
    ) {
      //removeHtml= <Ionicons name="md-remove-circle"  onPress={() => this.removeCard()} size={32} color="red" />
      removeHtml = (
        <Button
          block
          title="Remove this Card"
          onPress={() => this.removeCardBill()}
          buttonStyle={[{ backgroundColor: "red" }]}
          style={[styles.buttonDanger]}
        ></Button>
      );
    }

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
                name="form_bill_bank"
                component={renderPicker}
                mode="dropdown"
                onChange={this.onBankCardChange}
                style={[styles.select]}
              >
                <Picker.Item key={-1} value={0} label="Select Card" />

                {/* {Object.keys(CREDIT_CARD_BANKS).map((oneKey, i) => {
                  return (
                    <Picker.Item key={oneKey} value={oneKey} label={oneKey} />
                  );
                })} */}
                {/* {Object.keys(this.state.cardOptions).map((oneKey, i) => {
                  console.log(oneKey,i)
                  return (
                    <Picker.Item key={oneKey} value={oneKey} label={oneKey} />
                  );
                })} */}
                {this.state.cardOptions.map((s, i) => {
                  return <Picker.Item key={i} value={s.id} label={s.value} />;
                })}
              </Field>
            </View>

            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_bill_date"
                placeholder="Enter Bill Date"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>

            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_bill_amount"
                placeholder="Total Bill Amount"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_bill_min_due"
                placeholder="Minimum Due Amount"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_bill_due_date"
                placeholder="Due Date"
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
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  success: makeSelectCardBillSuccessResp(),
  error: makeSelectCardBillErrorResp(),
  cards: makeSelectCardList(),
  loading: makeSelectCardBillApiLoading(),
  carddetail: makeSelectCardDetails()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCardDetail: val => dispatch(getCardDetail(val)),
    addNewCardBill: val => dispatch(addCardBill(val)),
    dispatchUpdateCardBill: (id, val) => dispatch(updateCardBill(id, val)),
    dispatchRemoveCardBill: id => dispatch(removeCardBill(id)),
    changeFieldValue: function(field, value) {
      dispatch(change(form, field, value));
    }
  };
}

const form = "creditCardBillForm";

AddCreditCardBill = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(AddCreditCardBill);

const selector = formValueSelector(form);
AddCreditCardBill = connect(state => {
  const form_bill_date = selector(state, "form_bill_date");
  const form_bill_bank = selector(state, "form_bill_bank");
  const form_bill_amount = selector(state, "form_bill_amount");
  const form_bill_min_due = selector(state, "form_bill_min_due");
  const form_bill_due_date = selector(state, "form_bill_due_date");
  return {
    form_bill_date,
    form_bill_bank,
    form_bill_amount,
    form_bill_min_due,
    form_bill_due_date
  };
})(AddCreditCardBill);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCardBill);
