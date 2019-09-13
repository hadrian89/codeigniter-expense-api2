import React, { StyleSheet } from 'react-native'
import { colors, fonts } from './theme'
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  select:{
    height: 45,
    borderWidth: 0,
    marginLeft:10,
    marginRight:10,
    borderBottomWidth:1,
    //fontSize: 16,
    color:'rgb(0, 0, 0)',
    alignSelf: 'stretch',
  }
})