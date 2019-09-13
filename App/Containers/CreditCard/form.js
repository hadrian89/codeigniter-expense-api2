import React from "react";

import { connect } from "react-redux";
import { Text, View } from "react-native";
import Select from "../../Components/Select";

import { Button, Input } from "react-native-elements";

import { createStructuredSelector } from "reselect";
import { changeCardNo, changeCardBank, changeCardLimit, addCard } from "./actions";
import {
  makeSelectCardNo,
  makeSelectCardBank,
  makeSelectCardLimit
} from "./selectors";

class AddCreditCard extends React.Component {
  static navigationOptions = {
    title: "Add Credit Card"
  };
  state = {
    cardNumber: "",
    selectedCard: "",
    interestRate: "",
    creditLimit: "",
    cardOptionss: ["HSBC", "HDFC", "SBI"],
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

  onChangeCardNo = value => {
    this.props.changeFormCardNo(value);
  };
  onChangeLimit = value => {
    this.props.changeFormCardLimit(value);
  };
  onSelectCard = value => {
    this.props.changeFormCardBank(value);
  };

  onSaveContinue=()=>{
    console.log('2')
    this.props.addNewCard();
  }

  render() {
    const { form_card_no, form_card_bank, form_card_limit } = this.props;

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
        <Input
          name="cc"
          value={form_card_no}
          placeholder="Enter Card Number"
          type="number"
          keyboardType="numeric"
          onChangeText={this.onChangeCardNo}
        />
        <Select
          selectedValue={form_card_bank}
          onValueChange={this.onSelectCard}
          options={this.state.cardOptions}
        ></Select>

        <Input
          value={form_card_limit}
          placeholder="Enter Credit Limit"
          type="number"
          keyboardType="numeric"
          onChangeText={this.onChangeLimit}
        />

        <Button
          title="Save and Continue"
          onPress={() => this.onSaveContinue()}
          full
          rounded
          success
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
    changeFormCardNo: val => dispatch(changeCardNo(val)),
    changeFormCardBank: val => dispatch(changeCardBank(val)),
    changeFormCardLimit: val => dispatch(changeCardLimit(val)),
    addNewCard: () => dispatch(addCard())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditCard);
