/**
 * @providesModule SnackbarAndroid
 */

'use strict';

/**
 * This exposes the native SnackbarAndroid module in JS.
 */

var { NativeModules } = require('react-native');
var NativeSnackbar = NativeModules.SnackbarAndroid;

var SnackbarAndroid = {
  SHORT: NativeSnackbar.SHORT,
  LONG: NativeSnackbar.LONG,

  show: function (
    message: string,
    duration: ?number
  ): void {
    if (duration == null) duration = this.SHORT;
    NativeSnackbar.show(message, duration);
  }
};

module.exports = SnackbarAndroid;
