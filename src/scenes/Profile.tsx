import { withNavigationFocus } from 'react-navigation'

import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as reduxActions from '../common/actions'

import ParalxScrolView from '../components/ParalaxScrollView'
import ProfileCircle from '../components/ProfileCircle'

import { foodsaver } from '../common/placeholder'
import BackButton from '../components/BackButton'
import colors from '../common/colors'
import { userToConversationId } from '../common/api'
import { Actions } from 'react-native-router-flux'

const { width, height } = Dimensions.get('window')

const avatar = 'https://foodsharing.de/img/130_q_avatar.png'
    , headerHeight = isIphoneX() ? 150 : 120
    , circles = [
      {name: 'bananacount', unit: ''},
      {name: 'basketcount', unit: ''},
      {name: 'postcount', unit: ''},
      {name: 'fetchcount', unit: 'x'},
      {name: 'fetchweight', unit: 'kg'}
    ]

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Alfa Slab One'
  },
  nameContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleBar: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    padding: 6,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.profileButtonText
  },
  header: {
    height: headerHeight,
    width,
    backgroundColor: colors.background,
    paddingTop: isIphoneX() ? 30 : 14,
  },
  category: {
    color: colors.profileCategory,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Alfa Slab One'
  }
})

type Props = {
  id: number

  foodsavers: any
  actions: any
  isFocused: boolean
}

class Profile extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { actions, id } = this.props
    if (prevProps.isFocused === false && this.props.isFocused === true)
      actions.navigation('profile', id)
  }

  async componentDidMount() {
    const { actions, id } = this.props
    actions.navigation('profile', id)
    actions.fetchProfile(id)
  }

  render() {
    const { id, foodsavers, actions } = this.props
        , profile = foodsaver(foodsavers[`${id}`])
    console.log(profile)

    const Button = ({icon, label, onPress}) =>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Icon name={icon} size={26} color={colors.profileButtonIcon}/>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>

    return (
      <View style={styles.container}>
        <ParalxScrolView
          image={{uri: profile.photo ? 'https://foodsharing.de/images/' + profile.photo : avatar}}
          imageHeight={height * 0.5}
          headerHeight={headerHeight}
          headerComponent={
            <View style={styles.header}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>
                  {profile.name}
                </Text>
              </View>
              <View style={styles.circleBar}>
                {!!profile.stats && circles.map(circle =>
                  !!profile.stats[circle.name] &&
                  <ProfileCircle
                    key={'circle' + circle.name}
                    label={circle.name}
                    value={profile.stats[circle.name]}
                    unit={circle.unit}
                  />
                )}
              </View>
            </View>
          }
        >
          <View style={{minHeight: height - headerHeight, backgroundColor: colors.white, marginTop: 5, padding: 20}}>
            <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly'}}>
              <Button
                label={`Ich kenne\n${profile.name}`}
                icon="account-plus-outline"
                onPress={() => actions.requestFriendship(profile.id)}
              />
              <Button
                label={`Nachricht\nschreiben`}
                icon="message-text-outline"
                onPress={async () => {
                  const conversationId = (await userToConversationId(profile.id)).toString()
                  Actions.jump('conversation', {conversationId})
                }}
              />
              <Button
                label={`Verstoß\nmelden`}
                icon="alert-decagram-outline"
                onPress={() =>
                  Actions.jump('report', {id: profile.id})
                }
              />
            </View>

            <Text style={styles.category}>
              Infos
            </Text>

            <Text style={styles.category}>
              Status-Updates
            </Text>
          </View>
        </ParalxScrolView>
        <BackButton />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  foodsavers: state.foodsavers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reduxActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(Profile))
