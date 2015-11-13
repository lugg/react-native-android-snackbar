'use strict';

var React = require('react-native');

var SnackbarAndroid = require('react-native-android-snackbar');

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
        <TouchableOpacity onPress={this.showDefaultSnackbar}>
          <Text style={styles.label}>
            Click to show short snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showLongSnackbar}>
          <Text style={styles.label}>
            Click to show longer snackbar
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  showDefaultSnackbar: function() {
    SnackbarAndroid.show('Hello World!');
  },

  showLongSnackbar: function() {
    var msg = 'Hello world, this snackbar stays on screen longer';
    SnackbarAndroid.show(msg, SnackbarAndroid.LONG);
  },
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
