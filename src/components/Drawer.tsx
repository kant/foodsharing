import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../common/colors'

import Version from './Version'
import Logo from './Logo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawerBackground
  },
  header: {
    height: 80,
    marginTop: 20,
    paddingLeft: 12,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  username: {
    color: colors.drawerUser
  },
  content: {
    flex: 1,
    backgroundColor: colors.white
  },
  footer: {
    backgroundColor: colors.white,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = {}

export default class Drawer extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo size={28} />
          <Text style={styles.username}>
            Username
          </Text>
        </View>
        <View style={styles.content} />
        <View style={styles.footer}>
          <Version />
        </View>
      </View>
    )
  }
}