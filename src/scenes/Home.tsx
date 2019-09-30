// TODO:  template - clean up afterwards
import { withNavigationFocus } from 'react-navigation'

import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as reduxActions from '../common/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

type Props = {
  actions: any
  isFocused: boolean
}

class Home extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { actions } = this.props
    if (prevProps.isFocused === false && this.props.isFocused === true)
      actions.navigation('home')
  }

  componentDidMount() {
    const { actions } = this.props
    actions.navigation('home')
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  conversations: state.conversations
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reduxActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(Home))
