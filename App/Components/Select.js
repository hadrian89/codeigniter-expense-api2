import React from 'react'
import { Picker } from 'react-native';
import styles from '../style'

export default ({ selectedValue, options, onValueChange, ...props }) => (

  <Picker
    {...props}
    selectedValue={selectedValue}
    style={[styles.select]}
    onValueChange={value => onValueChange(value)}>
    <Picker.Item key={-1} value={0} label="Select Card" />
    {options.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })}
  </Picker>
)
