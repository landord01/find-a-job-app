import React from 'react';
import Expo, { Notifications } from 'expo';
import { StyleSheet, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import registerForNotifications from './services/push_notification';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'receive' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'OK.' }]
        );
      } 
    });
  }
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: { screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review0: { screen: createStackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingsScreen }
           })
          },
        }, {
          tabBarOptions: {
            labelStyle: {
              fontSize: 12
            }
          }
        }) 
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
