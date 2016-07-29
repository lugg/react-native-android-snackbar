/**
 * @providesModule SnackbarAndroid
 */

'use strict';

/**
 * This exposes the native SnackbarAndroid module in JS.
 */

import { DeviceEventEmitter, NativeModules, processColor } from 'react-native';

var NativeSnackbar = NativeModules.SnackbarAndroid;

// List of registered event listeners
var eventListeners = {}

// Map of event names for consumers to names delivered by native module
var eventListenerMap = {
  hide: NativeSnackbar.EVENT_HIDE,
  hidden: NativeSnackbar.EVENT_HIDDEN,
  show: NativeSnackbar.EVENT_SHOW,
  shown: NativeSnackbar.EVENT_SHOWN
}

var SnackbarAndroid = {
  SHORT:       NativeSnackbar.SHORT,
  LONG:        NativeSnackbar.LONG,
  INDEFINITE:  NativeSnackbar.INDEFINITE,
  ANIMATION_DURATION: NativeSnackbar.ANIMATION_DURATION,
  ANIMATION_FADE_DURATION: NativeSnackbar.ANIMATION_FADE_DURATION,
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
    var color = processColor(options.actionColor);

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
  },

  /**
   * Add an event listener for the specified event type
   *
   * @param {String} eventType   one of 'hide', 'show', 'hidden' or 'shown'
   * @param {Function} callback  callback to execute when event is received
   */
  addEventListener(eventType: string, callback: Function): void {
    if (eventType in eventListenerMap) {
      eventListeners[callback] = DeviceEventEmitter.addListener(
        eventListenerMap[eventType],
        callback
      );
    }
  },

  /**
   * Removes a previously registered event listener for the specified type.
   *
   * @param {String} eventType   type of event that callback was registered to
   * @param {Function} callback  listener to remove. Must be the same object
   *                             reference as the function that was originally
   *                             passed to addEventListener()
   */
  removeEventListener(eventType: string, callback: Function): void {
    if (eventType in eventListenerMap) {
      if (callback in eventListeners) {
        DeviceEventEmitter.removeSubscription(eventListeners[callback]);
        delete eventListeners[callback];
      }
    }
  }
};

module.exports = SnackbarAndroid;
