import React, {PureComponent} from 'react'
import {SafeAreaView, StyleSheet, Text} from 'react-native'
import colors from '../colors'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = {}

export default class Home extends PureComponent<Props> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text onPress={() => Actions.replace('login')}>
          back
        </Text>
      </SafeAreaView>
    )
  }
}