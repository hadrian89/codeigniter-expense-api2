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
import { getCardEmi } from "./actions";
import {
  makeSelectCardEmiList,
  makeSelectCardEmiApiLoading
} from "./selectors";

class CreditCardEmiList extends React.Component {
  static navigationOptions = {
    title: "Credit Card Emi List"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      notFound: "Card not found.\nPlease click (Add card) button to add it."
    };
    this.editCardEmi = this.editCardEmi.bind(this);
  }
  componentDidMount() {
    // this.props.dispatchGetCardEmi();
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
        this.props.dispatchGetCardEmi();
      }
    }
  }

  editCardEmi(id, bank) {
    let allcardemis = this.props.card_emi_list;
    let carddetail = [];
    if (typeof allcardemis !== "undefined") {
      if (allcardemis.length > 0) {
        allcardemis.map(function(v, k) {
          if (v["bank"] === bank) {
            v["data"].map(function(r, s) {
              if (r.id === id) {
                carddetail = r;
              }
            });
          }
        });
      }
    }
    this.props.navigation.navigate("AddEMI", { emiid: carddetail });
  }

  renderRow(bank, bank_name) {
    return (
      <View>
        <TouchableOpacity
          style={[styles.sectionListRow]}
          button
          onPress={() => this.editCardEmi(bank.id, bank_name)}
        >
          <View style={[styles.sectionListItem]}>
            <Text>Emi For</Text>
            <Text>{bank.description}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Principle Amount</Text>
            <Text>{bank.principal_amnt}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Monthly EMI</Text>
            <Text>{bank.emi_amnt}</Text>
          </View>
          <View style={[styles.sectionListItem]}>
            <Text>Booked Date</Text>
            <Text>{bank.booked_date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let allcardemis = this.props.card_emi_list;

    if (typeof allcardemis === "undefined") {
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
            title="Add Credit Card Emi"
            onPress={() => this.props.navigation.navigate("AddEMI")}
            success
          ></Button>

          <SafeAreaView style={[styles.containerList]}>
            <SectionList
              sections={allcardemis}
              keyExtractor={(item, index) => item + index}
              //    renderItem={({ item }) => <Items bank={item} />}
              renderItem={({ section: { bank }, item }) => {
                return this.renderRow(item, bank);
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
  card_emi_list: makeSelectCardEmiList(),
  loading: makeSelectCardEmiApiLoading()
});
const mapDispatchToProps = {
  dispatchGetCardEmi: () => getCardEmi(),
  //dispatchGetUserAllCards: () => getCurrentUserCCCards()
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardEmiList);
