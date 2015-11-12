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
        <TouchableOpacity onPress={this.showSnackbar}>
          <Text style={styles.label}>
            Click to show Snackbar
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  showSnackbar: function() {
    SnackbarAndroid.show('Hello!')
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
  },
});

AppRegistry.registerComponent('Example', () => Example);
