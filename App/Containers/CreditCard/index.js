import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";

import { ListItem,withTheme } from "react-native-elements";
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
  }
  componentDidMount() {
    this.props.dispatchGetCard();
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
            name: v.bank_name + " (" + v.card_number + ")",
            subtitle: "Limit Left: " + v.credit_limit
          });
        });
      }

      return (
        <View>
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
              subtitle={l.subtitle}
              bottomDivider
            />
          ))}
          {cards_image.length == 0 && (
            <Text>{notFound}</Text>
          )}
        </View>
      );
    }
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
)(withTheme(CreditCardList));
