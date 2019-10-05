import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextField } from 'react-native-material-textfield'

import colors from '../common/colors'

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: 14,
    left: 10
  }
})

type Props = {
  onChange: (text) => void
  value: string
  icon: string
  placeholder: string
}

export default class ContactInput extends PureComponent<Props> {
  render() {
    const { value, onChange, icon, placeholder } = this.props
    return (
      <View style={{paddingLeft: 10}}>
        <TextField
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          labelHeight={4}
          tintColor={colors.background}
          baseColor={colors.background}
          containerStyle={{marginTop: 10}}
          inputContainerStyle={{paddingLeft: 33}}
          label=""
          keyboardType="number-pad"
        />

        <Icon
          name={icon}
          size={20}
          color={colors.background}
          style={styles.icon}
        />
      </View>
    )
  }
}