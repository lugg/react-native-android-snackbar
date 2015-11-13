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
        <TouchableOpacity onPress={() => this.showSnackbar(SnackbarAndroid.SHORT)}>
          <Text style={styles.label}>
            Click to show short snackbar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.showSnackbar(SnackbarAndroid.LONG)}>
          <Text style={styles.label}>
            Click to show longer snackbar
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  showSnackbar: function(length) {
    SnackbarAndroid.show('Hello World!', length)
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
