import React from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  Platform
} from "react-native";
import { connect } from "react-redux";

import { ListItem, withTheme } from "react-native-elements";
import { createStructuredSelector } from "reselect";
import { getCard } from "./actions";
import { makeSelectCardList } from "./selectors";

class CreditCardList extends React.Component {
  static navigationOptions = {
    title: "Credit Card List"
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      notFound: "Card not found.\nPlease click (Add card) button to add it."
    };
    this.editCard = this.editCard.bind(this);
  }
  componentDidMount() {
    this.props.dispatchGetCard();
  }

  editCard(id) {
    let allcards = this.props.card_list;
    let carddetail = [];
    if (typeof allcards !== "undefined") {
      if (allcards.cards.length > 0) {
        allcards.cards.map(function(v, k) {
          if (v.id === id) {
            // carddetail.push(v);
            carddetail=v;
          }
        });
      }
    }
    this.props.navigation.navigate("CreditCardForm", { cardid: carddetail });
  }

  render() {
    let cards_image = [];
    let allcards = this.props.card_list;

    if (typeof allcards === "undefined") {
      return (
        <View>
          <Text>Error fetching in card list.</Text>
          <Button
            block
            title="Go to Dashboard"
            onPress={() => this.props.navigation.navigate("Dashboard")}
            success
          >
            <Text> Add Credit Cards </Text>
          </Button>
        </View>
      );
    } else {
      if (allcards.cards.length > 0) {
        allcards.cards.map(function(v, k) {
          cards_image.push({
            id: v.id,
            name: v.bank_name + " (" + v.card_number + ")",
            // avatar_url: require("../../../assets/images/" +
            //   v.bank_name.toLowerCase() +
            //   ".jpg"),
            subtitle: "Limit Left: " + v.credit_limit
          });
        });
      }
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

    return (
      <ScrollView>
        <Button
          block
          title="Add Credit Card"
          onPress={() => this.props.navigation.navigate("CreditCardForm")}
          success
        >
          <Text> Add Credit Cards </Text>
        </Button>
        {cards_image.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            //leftAvatar={{ source: { uri: l.avatar_url } }}
            subtitle={l.subtitle}
            bottomDivider
            button
            onPress={() => this.editCard(l.id)}
            Component={SafeTouchableHighlight}
          />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  card_list: makeSelectCardList()
});
const mapDispatchToProps = {
  dispatchGetCard: () => getCard("1")
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardList);
