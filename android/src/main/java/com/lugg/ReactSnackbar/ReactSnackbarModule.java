package com.lugg.ReactSnackbar;

import android.app.Activity;
import android.graphics.Color;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.design.widget.Snackbar;
import android.view.View;
import android.widget.TextView;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
import java.util.HashMap;

public class ReactSnackbarModule extends ReactContextBaseJavaModule {
  private Snackbar mSnackbar = null;

  private static final String LENGTH_SHORT = "SHORT";
  private static final String LENGTH_LONG = "LONG";
  private static final String LENGTH_INDEFINITE = "INDEFINITE";

  // Events which will be posted to the JS module
  private static final String EVENT_HIDE = "snackbarHide";
  private static final String EVENT_HIDDEN = "snackbarHidden";
  private static final String EVENT_SHOW = "snackbarShow";
  private static final String EVENT_SHOWN = "snackbarShown";

  /**
   * @hack
   *
   * Durations of animations and show constants.
   *
   * Taken from Android source code.  This sucks because if they change, we'll
   * have to update these.  Unfortunately there doesn't seem to be anyway to get
   * these values programmatically.
   *
   * https://github.com/android/platform_frameworks_support/blob/62eb3105e51335cf9074a5506d8d2b220aeb95dc/design/src/android/support/design/widget/Snackbar.java
   */
  private static final int ANIMATION_DURATION = 250;
  private static final int ANIMATION_FADE_DURATION = 180;
  private static final int DURATION_SHORT_MS = 1500;
  private static final int DURATION_LONG_MS = 2750;

  private static final int COLOR_BACKGROUND = -13487566; // #323232
  private static final int COLOR_TEXT = Color.WHITE;

  private ReactContext mContext;

  public ReactSnackbarModule(ReactApplicationContext reactContext) {
    super(reactContext);

    mContext = reactContext;
  }

  /**
   * Delivers an event to the JS module.
   *
   * @param eventType the event type, such the constant EVENT_SHOW
   * @param params map of event parameters that the JS will receive
   */
  private void sendEvent(String eventType, @Nullable WritableMap params) {
    mContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventType, params);
  }

  /**
   * Sends EVENT_HIDE to the JS module after the specified delay
   *
   * @param delayMs delay before sending EVENT_HIDE, in ms
   */
  private void setupDelayedHideEvent(int delayMs) {
    final Handler handler = new Handler();
    handler.postDelayed(new Runnable() {
      @Override
      public void run() {

        // If Snackbar is not already dismissed, fire EVENT_HIDE
        if (mSnackbar != null && mSnackbar.isShown()) {
          ReactSnackbarModule.this.sendEvent(EVENT_HIDE, null);
        }
      }
    }, delayMs);
  }

  @Override
  public String getName() {
    return "SnackbarAndroid";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(LENGTH_SHORT, Snackbar.LENGTH_SHORT);
    constants.put(LENGTH_LONG, Snackbar.LENGTH_LONG);
    constants.put(LENGTH_INDEFINITE, Snackbar.LENGTH_INDEFINITE);
    constants.put("EVENT_HIDE", EVENT_HIDE);
    constants.put("EVENT_HIDDEN", EVENT_HIDDEN);
    constants.put("EVENT_SHOW", EVENT_SHOW);
    constants.put("EVENT_SHOWN", EVENT_SHOWN);
    constants.put("ANIMATION_DURATION", ANIMATION_DURATION);
    constants.put("ANIMATION_FADE_DURATION", ANIMATION_FADE_DURATION);
    return constants;
  }

  @ReactMethod
  public void show(String message, final int length, boolean hideOnClick, int actionColor, String actionLabel, final Callback actionCallback) {
    final Activity activity = getCurrentActivity();

    if (activity == null) return;

    View view = activity.findViewById(android.R.id.content);
    mSnackbar = Snackbar.make(view, message, length);

    mSnackbar.setCallback(new Snackbar.Callback() {
      /**
       * When the Snackbar is hidden, fire EVENT_HIDDEN to the JS module
       * @todo send event in params
       *
       * @param snackbar the snackbar which was hidden
       * @param event    one of the Snackbar's event type constants
       */
      public void onDismissed(Snackbar snackbar, int event) {
        ReactSnackbarModule.this.sendEvent(EVENT_HIDDEN, null);
      }

      /**
       * When the Snackbar is shown, fire EVENT_SHOWN to the JS module
       */
      public void onShown(Snackbar snackbar) {
        ReactSnackbarModule.this.sendEvent(EVENT_SHOWN, null);

        /* Setup a delay for firing EVENT_HIDE after the specified show duration
         * expires, provided the length is not LENGTH_INDEFINITE (-2) */
        if (length > Snackbar.LENGTH_INDEFINITE) {
          switch (length) {
            case Snackbar.LENGTH_SHORT:
              setupDelayedHideEvent(DURATION_SHORT_MS);
              break;
            case Snackbar.LENGTH_LONG:
              setupDelayedHideEvent(DURATION_LONG_MS);
              break;
            default:
              setupDelayedHideEvent(length);
          }
        }
      }
    });

    // enforce snackbar background/text color so it doesn't inherit from styles.xml
    View snackbarView = mSnackbar.getView();
    snackbarView.setBackgroundColor(COLOR_BACKGROUND);
    TextView textView = (TextView) snackbarView.findViewById(R.id.snackbar_text);
    textView.setTextColor(COLOR_TEXT);

    // Add a state change listener for firing EVENT_SHOW
    snackbarView.addOnAttachStateChangeListener(new View.OnAttachStateChangeListener() {
      @Override
      public void onViewAttachedToWindow(View v) {
        ReactSnackbarModule.this.sendEvent(EVENT_SHOW, null);
      }

      @Override
      public void onViewDetachedFromWindow(View v) { }
    });

    // set a custom action color
    mSnackbar.setActionTextColor(actionColor);

    if (hideOnClick) {
      mSnackbar.setAction("Dismiss", new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          ReactSnackbarModule.this.dismiss();
        }
      });
    }
    else if (actionLabel != null && actionCallback != null) {
      mSnackbar.setAction(actionLabel, new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          ReactSnackbarModule.this.dismiss();
          actionCallback.invoke();
        }
      });
    }

    mSnackbar.show();
  }

  @ReactMethod
  public void dismiss() {
    if (mSnackbar == null) {
      return;
    }

    sendEvent(EVENT_HIDE, null);
    mSnackbar.dismiss();
    mSnackbar = null;
  }
}
