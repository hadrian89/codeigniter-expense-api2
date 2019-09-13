import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  Button
} from 'react-native';

import { connect } from 'react-redux'

import Input from '../../Components/Input'

import styles from '../../style'

const initialState = {
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: ''
}

class RegistrationScreen extends Component {
  state = initialState
  static navigationOptions = {
    header: null
  }
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  signUp() {
    this.props.navigation.navigate('Home')
  }

  confirm() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const  {
      showSignUpConfirmationModal,
      signUpError,
      signUpErrorMessage
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            source={require('../../../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>
          Welcome,
        </Text>
        <Text style={styles.greeting2}>
          sign up to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.state.username}
            placeholder="User Name"
            type='username'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.email}
            placeholder="Email"
            type='email'
            onChangeText={this.onChangeText}
          />
          <Input
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={this.onChangeText}
          />
          <Input
            placeholder="Phone Number"
            type='phone_number'
            keyboardType='numeric'
            onChangeText={this.onChangeText}
            value={this.state.phone_number}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={() => this.props.navigation.navigate('CreditCard')}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
        {
          showSignUpConfirmationModal && (
            <Modal>
              <View style={styles.modal}>
                <Input
                  placeholder="Authorization Code"
                  type='authCode'
                  keyboardType='numeric'
                  value={this.state.authCode}
                  keyboardType='numeric'
                />
                <Button
                  title='Confirm'
                  onPress={() => this.props.navigation.navigate('CreditCard')}
                />
              </View>
            </Modal>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // auth: state.auth
})

const mapDispatchToProps = {
//  dispatchConfirmUser: (username, authCode) => confirmUserSignUp(username, authCode),
//  dispatchCreateUser: (username, password, email, phone_number) => createUser(username, password, email, phone_number)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
