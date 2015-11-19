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
  SHORT:       NativeSnackbar.SHORT,
  LONG:        NativeSnackbar.LONG,
  INDEFINITE:  NativeSnackbar.INDEFINITE,
  UNTIL_CLICK: 42,

  show: function (
    message: string,
    duration: ?number
  ): void {

    var hideOnClick = false;

    if (duration == null) {
      duration = this.SHORT;
    }
    else if (duration == this.UNTIL_CLICK) {
      duration = this.INDEFINITE
      hideOnClick = true;
    }

    this.snackbar = NativeSnackbar.show(message, duration, hideOnClick);
  }
};

module.exports = SnackbarAndroid;
