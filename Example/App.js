import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Snackbar from 'react-native-android-snackbar';

export default class App extends Component<{}> {
  _onPressCustomSnackbar() {
    Snackbar.show('This has a custom action:', {
      actionColor: '#FFCA00',
      actionLabel: 'CLICK',
      actionCallback: (() => Snackbar.show('Nice click!'))
    });
  };

  render() {
    return (
      <View style={Styles.Container}>
        <TouchableOpacity onPress={() => Snackbar.show('Hello World!')}>
          <Text style={Styles.Label}>
            Click to show short snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Snackbar.show('This snackbar stays on screen for longer', { duration: Snackbar.LONG })}>
          <Text style={Styles.Label}>
            Click to show longer snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Snackbar.show('Click to dismiss', { duration: Snackbar.UNTIL_CLICK })}>
          <Text style={Styles.Label}>
            Click to show permanent snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressCustomSnackbar}>
          <Text style={Styles.Label}>
            Click to show snackbar with custom action
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Label: {
    fontSize: 18,
    marginBottom: 16,
  },
});
