import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Picker,
  Button
} from 'react-native'

import { connect } from 'react-redux'

import Input from '../../Components/Input'
import Select from '../../Components/Select'

import styles from '../../style'

class HomeScreen extends React.Component {

  state = {
    cardNumber: '',
    selectedCard:'',
    interestRate:'',
    creditLimit:'',
    cardOptions:["HSBC","HSFC","BOB","SBI"]
  }
  componentDidMount(){
    console.log(styles.submitButton,'ss')
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.greeting2}>
          Enter Credit Card Details
        </Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.cardNumber}
            placeholder="Enter Card Number"
            type='number'
            keyboardType='numeric'
            onChangeText={this.onChangeText}
          />
          <Select
            selectedValue={this.state.selectedCard}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }
            options={this.state.cardOptions}
            >
          </Select>
          <Input
            value={this.state.creditLimit}
            placeholder="Enter Credit Limit"
            type='number'
            keyboardType='numeric'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.interestRate}
            placeholder="Interest Rate"
            type='number'
            keyboardType='numeric'
            onChangeText={this.onChangeText}
          />

        </View>
        <Button style={styles.submitButton}
          title='Save and Continue'
          onPress={() => this.props.navigation.navigate('CreditCardForm')}
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  // auth: state.auth
})

const mapDispatchToProps = {
  //  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)