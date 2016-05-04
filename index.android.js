/**
 * @providesModule SnackbarAndroid
 */

'use strict';

/**
 * This exposes the native SnackbarAndroid module in JS.
 */

var React = require('react-native');
var NativeSnackbar = React.NativeModules.SnackbarAndroid;

var SnackbarAndroid = {
  SHORT:       NativeSnackbar.SHORT,
  LONG:        NativeSnackbar.LONG,
  INDEFINITE:  NativeSnackbar.INDEFINITE,
  UNTIL_CLICK: 42,

  show: function (
    message: string,
    options: {
      duration: number,
      actionColor: string,
      actionLabel: string,
      actionCallback: Function,
    }
  ): void {
    var hideOnClick = false;

    if (options == null) {
      options = {};
    }

    var label, callback;
    if (options.actionLabel && options.actionCallback) {
      if (options.duration == null) {
        options.duration = this.INDEFINITE;
      }

      label = options.actionLabel;
      callback = options.actionCallback;
    }

    if (options.duration == null) {
      options.duration = this.SHORT;
    }
    else if (options.duration == this.UNTIL_CLICK) {
      options.duration = this.INDEFINITE;
      hideOnClick = true;
    }

    if (options.actionColor == null) {
      options.actionColor = '#EEFF41';
    }
    var color = React.processColor(options.actionColor);

    this.snackbar = NativeSnackbar.show(
      message,
      options.duration,
      hideOnClick,
      color,
      label,
      callback);
  },

  dismiss: function(): void {
    NativeSnackbar.dismiss();
  }
};

module.exports = SnackbarAndroid;
