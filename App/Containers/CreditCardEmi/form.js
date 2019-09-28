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
  addCardEmi,
  updateCardEmi,
  removeCardEmi
} from "./actions";
import {
  makeSelectCardList
} from "../CreditCard/selectors";

import {
  makeSelectCardEmiSuccessResp,
  makeSelectCardEmiErrorResp,
  makeSelectCardEmiApiLoading,
  makeSelectUserAllCards,
  makeSelectCardEmiDetails
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

  if (!alldata.form_emi_date) {
    errors.form_emi_date = "Please enter emi date";
  }

  if (!alldata.form_emi_bank) {
    errors.form_emi_bank = "Please select bank";
  }

  if (!alldata.form_emi_amount) {
    errors.form_emi_amount = "Please enter emi amount";
  }
  if (!alldata.form_emi_due_date) {
    errors.form_emi_due_date = "Please enter due date";
  }
  if (!alldata.form_emi_principle_amount) {
    errors.form_emi_principle_amount = "Please enter principle amount";
  }
  if (!alldata.form_emi_description) {
    errors.form_emi_description = "Please enter EMI for";
  }
  if (!alldata.form_emi_tenure) {
    errors.form_emi_tenure = "Please enter EMI tensure";
  }
  if (!alldata.form_emi_outstanding_amount) {
    errors.form_emi_outstanding_amount = "Please enter outstanding EMI amount";
  }

  return errors;
}

class AddCreditCardEmi extends React.Component {
  static navigationOptions = {
    title: "Add Credit Card Emi"
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
            this.props.navigation.state.params.emiid
          ) {
            this.props.dispatchUpdateCardEmi(
              this.props.navigation.state.params.emiid.id,
              values
            );
          } else {
            this.props.addNewCardEmi(values);
          }
        }
      });

    return false;
  };

  componentDidMount() {
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
      this.props.navigation.state.params.emiid
    ) {
      console.log(this.props.navigation.state.params.emiid)
      this.props.changeFieldValue(
        "form_emi_date",
        this.props.navigation.state.params.emiid.booked_date
      );
      this.props.changeFieldValue(
        "form_emi_bank",
        this.props.navigation.state.params.emiid.card_id
      );
      this.props.changeFieldValue(
        "form_emi_amount",
        this.props.navigation.state.params.emiid.emi_amnt
      );
      this.props.changeFieldValue(
        "form_emi_principle_amount",
        this.props.navigation.state.params.emiid.principal_amnt
      );
      this.props.changeFieldValue(
        "form_emi_description",
        this.props.navigation.state.params.emiid.description
      );
      this.props.changeFieldValue(
        "form_emi_tenure",
        this.props.navigation.state.params.emiid.tenure
      );
      this.props.changeFieldValue(
        "form_emi_outstanding_amount",
        this.props.navigation.state.params.emiid.outstanding_principle
      );
      this.props.changeFieldValue(
        "form_emi_due_date",
        this.props.navigation.state.params.emiid.due_date
      );
     // this.onBankCardChange(this.props.navigation.state.params.emiid.card_id)
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.cards != this.props.cards && this.props.cards && this.state.cardOptions.length ===0) {
      this.formatCards();
    }
    if (prevProps.success != this.props.success && this.props.success) {
      this.props.navigation.navigate("CreditCardEmi", { reload: true });
    }

    // if (prevProps.error != this.props.error && this.props.error) {
    //   console.log(this.props.error, "this.props.error");
    // }
    if (prevProps.carddetail !== this.props.carddetail && this.props.carddetail) {
      this.props.changeFieldValue(
        "form_emi_due_date",
        this.props.carddetail.due_date
      );
    }
  }

  removeCardEmi = () => {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.emiid
    ) {
      this.props.dispatchRemoveCardEmi(
        this.props.navigation.state.params.emiid.id
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
      this.props.navigation.state.params.emiid
    ) {
      //removeHtml= <Ionicons name="md-remove-circle"  onPress={() => this.removeCard()} size={32} color="red" />
      removeHtml = (
        <Button
          block
          title="Remove this Card"
          onPress={() => this.removeCardEmi()}
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
                name="form_emi_bank"
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
                name="form_emi_date"
                placeholder="Enter EMI Date"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>

            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_amount"
                placeholder="EMI Amount"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_principle_amount"
                placeholder="Principle Amount"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_description"
                placeholder="EMI For"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_tenure"
                placeholder="EMI Tenure"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_outstanding_amount"
                placeholder="Outstanding Amount"
                type="number"
                keyboardType="numeric"
                style={[styles.input]}
              />
            </View>
            <View style={[styles.inputItem]}>
              <Field
                component={renderInput}
                name="form_emi_due_date"
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
  success: makeSelectCardEmiSuccessResp(),
  error: makeSelectCardEmiErrorResp(),
  cards: makeSelectCardList(),
  loading: makeSelectCardEmiApiLoading(),
  carddetail: makeSelectCardEmiDetails()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCardDetail: val => dispatch(getCardDetail(val)),
    addNewCardEmi: val => dispatch(addCardEmi(val)),
    dispatchUpdateCardEmi: (id, val) => dispatch(updateCardEmi(id, val)),
    dispatchRemoveCardEmi: id => dispatch(removeCardEmi(id)),
    changeFieldValue: function(field, value) {
      dispatch(change(form, field, value));
    }
  };
}

const form = "creditCardEmiForm";

AddCreditCardEmi = reduxForm({
  form,
  touchOnBlur: false,
  touchOnChange: false
})(AddCreditCardEmi);

const selector = formValueSelector(form);
AddCreditCardEmi = connect(state => {
  const form_emi_date = selector(state, "form_emi_date");
  const form_emi_bank = selector(state, "form_emi_bank");
  const form_emi_amount = selector(state, "form_emi_amount");
  const form_emi_principle_amount = selector(state, "form_emi_principle_amount");
  const form_emi_due_date = selector(state, "form_emi_due_date");
  return {
    form_emi_date,
    form_emi_bank,
    form_emi_amount,
    form_emi_principle_amount,
    form_emi_due_date
  };
})(AddCreditCardEmi);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCardEmi);
