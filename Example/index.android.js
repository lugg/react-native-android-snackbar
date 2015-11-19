'use strict';

var React = require('react-native');

var Snackbar = require('react-native-android-snackbar');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var Example = React.createClass({
  render: function() {
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
      </View>
    );
  },

  showSnackbarDefault: function() {
    Snackbar.show('Hello World!');
  },

  showSnackbarLong: function() {
    var msg = 'This snackbar stays on screen for longer';
    Snackbar.show(msg, { duration: Snackbar.LONG });
  },

  showSnackbarIndefinite: function() {
    Snackbar.show('Click to dismiss this one', { duration: Snackbar.UNTIL_CLICK });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24
  },
});

AppRegistry.registerComponent('Example', () => Example);
