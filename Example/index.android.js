'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Snackbar from 'react-native-android-snackbar';

class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showSnackbarDefault}>
          <Text style={styles.label}>
            Click to show short snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showSnackbarLong}>
          <Text style={styles.label}>
            Click to show longer snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showSnackbarIndefinite}>
          <Text style={styles.label}>
            Click to show permanent snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showSnackbarCustomAction}>
          <Text style={styles.label}>
            Click to show snackbar with custom action
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  showSnackbarDefault() {
    Snackbar.show('Hello World!');
  }

  showSnackbarLong() {
    Snackbar.show('This snackbar stays on screen for longer', { duration: Snackbar.LONG });
  }

  showSnackbarIndefinite() {
    Snackbar.show('Click to dismiss this one', { duration: Snackbar.UNTIL_CLICK });
  }

  showSnackbarCustomAction() {
    Snackbar.show('This has a custom action:', {
      actionColor: '#FFCA00',
      actionLabel: 'CLICK',
      actionCallback: (() => Snackbar.show('Nice click!'))
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
});

AppRegistry.registerComponent('Example', () => Example);
