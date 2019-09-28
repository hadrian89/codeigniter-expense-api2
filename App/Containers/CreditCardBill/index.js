import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  SectionList
} from "react-native";
import { connect } from "react-redux";
const remote = require("../../../assets/images/login-bg.jpg");

import styles from "../../style";

import { createStructuredSelector } from "reselect";
import { getCardBill } from "./actions";
import { makeSelectCardBillList, makeSelectCardBillApiLoading } from "./selectors";

class CreditCardBillList extends React.Component {
  static navigationOptions = {
    title: "Credit Card Bill List"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      notFound: "Card not found.\nPlease click (Add card) button to add it."
    };
    this.editCardBill = this.editCardBill.bind(this);
  }
  componentDidMount() {
    // this.props.dispatchGetCardBill();
    // this.props.dispatchGetUserAllCards();
  }

  componentWillReceiveProps(prevProps) {
    if (
      prevProps.navigation.state.params != this.props.navigation.state.params
    ) {
      if (
        prevProps.navigation.state.params &&
        prevProps.navigation.state.params.reload
      ) {
        this.props.dispatchGetCardBill();
      }
    }
  }

  editCardBill(id,bank) {
    
    let allcardbills = this.props.card_bill_list;
    let carddetail = [];
    if (typeof allcardbills !== "undefined") {
      if (allcardbills.length > 0) {
        allcardbills.map(function(v, k) {
          if (v['bank'] === bank) {
            v['data'].map(function(r,s){
                if(r.id === id){
                  carddetail = r;
                }
            })
          }
        });
      }
    }
    this.props.navigation.navigate("AddCCBill", { billid: carddetail });
  }

  renderRow(bank,bank_name) {
    return (
      <View>
        <TouchableOpacity  style={[styles.sectionListRow]} button onPress={() => this.editCardBill(bank.id,bank_name)}>
          <View style={[styles.sectionListItem]}>
            <Text>Bill Date</Text>
            <Text>{bank.bill_date}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Due Date</Text>
            <Text>{bank.due_date}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Min. Due</Text>
            <Text>{bank.min_due}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Billed Amount</Text>
            <Text>{bank.total_amnt}</Text>
          </View>
        </TouchableOpacity >
      </View>
    );
  }

  render() {
    let allcardbills = this.props.card_bill_list;

    if (typeof allcardbills === "undefined") {
      return (
        <View>
          <Text>Error fetching in card list.</Text>
          <Button
            block
            title="Go to Dashboard"
            onPress={() => this.props.navigation.navigate("Dashboard")}
            success
          ></Button>
        </View>
      );
    }

    function WebTouchableHighlight({ children, ...props }: any) {
      return (
        <TouchableHighlight {...props}>
          <View>{children}</View>
        </TouchableHighlight>
      );
    }

    const SafeTouchableHighlight =
      Platform.OS === "web" ? WebTouchableHighlight : TouchableHighlight;

    const { loading } = this.props;

    if (loading) {
      return (
        <View style={[styles.container]}>
          <View style={styles.modalBackground}>
            <View style={styles.activityLoading}>
              <ActivityIndicator size="large" />
            </View>
          </View>
        </View>
      );
    }
    return (
      <ImageBackground source={remote} style={styles.backgroundImage}>
        <ScrollView>
          <Button
            block
            title="Add Credit Card Bill"
            onPress={() => this.props.navigation.navigate("AddCCBill")}
            success
          ></Button>

          <SafeAreaView style={[styles.containerList]}>
            <SectionList
              sections={allcardbills}
              keyExtractor={(item, index) => item + index}
              //    renderItem={({ item }) => <Items bank={item} />}
              renderItem={({section: { bank }, item }) => {
                return this.renderRow(item,bank);
              }}
              renderSectionHeader={({ section: { bank } }) => (
                <Text style={[styles.sectionListHeader]}>{bank}</Text>
              )}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  card_bill_list: makeSelectCardBillList(),
  loading: makeSelectCardBillApiLoading()
});
const mapDispatchToProps = {
  dispatchGetCardBill: () => getCardBill(),
  //dispatchGetUserAllCards: () => getCurrentUserCCCards(),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardBillList);
