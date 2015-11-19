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
    options: {
      duration: number,
    }
  ): void {
    var hideOnClick = false;

    if (options == null) {
      options = {};
    }

    if (options.duration == null) {
      options.duration = this.SHORT;
    }
    else if (options.duration == this.UNTIL_CLICK) {
      options.duration = this.INDEFINITE
      hideOnClick = true;
    }

    this.snackbar = NativeSnackbar.show(message, options.duration, hideOnClick);
  }
};

module.exports = SnackbarAndroid;
