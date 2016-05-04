package com.lugg.ReactSnackbar;

import android.app.Activity;
import android.view.View;
import android.graphics.Color;
import android.widget.TextView;
import android.support.design.widget.Snackbar;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

public class ReactSnackbarModule extends ReactContextBaseJavaModule {
  private View mRootView = null;
  private Snackbar mSnackbar = null;

  private static final String LENGTH_SHORT = "SHORT";
  private static final String LENGTH_LONG = "LONG";
  private static final String LENGTH_INDEFINITE = "INDEFINITE";

  private static final int COLOR_BACKGROUND = -13487566; // #323232
  private static final int COLOR_TEXT = Color.WHITE;

  public ReactSnackbarModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mRootView = activity.getWindow().getDecorView().getRootView();
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
    return constants;
  }

  @ReactMethod
  public void show(String message, int length, boolean hideOnClick, int actionColor, String actionLabel, final Callback actionCallback) {
    mSnackbar = Snackbar.make(mRootView, message, length);

    // enforce snackbar background/text color so it doesn't inherit from styles.xml
    View snackbarView = mSnackbar.getView();
    snackbarView.setBackgroundColor(COLOR_BACKGROUND);
    TextView textView = (TextView) snackbarView.findViewById(R.id.snackbar_text);
    textView.setTextColor(COLOR_TEXT);

    // set a custom action color
    mSnackbar.setActionTextColor(actionColor);

    if (hideOnClick) {
      mSnackbar.setAction("Dismiss", new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          mSnackbar.dismiss();
        }
      });
    }
    else if (actionLabel != null && actionCallback != null) {
      mSnackbar.setAction(actionLabel, new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          mSnackbar.dismiss();
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

    mSnackbar.dismiss();
    mSnackbar = null;
  }
}
