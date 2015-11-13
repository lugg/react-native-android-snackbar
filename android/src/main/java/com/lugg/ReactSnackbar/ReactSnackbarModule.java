package com.lugg.ReactSnackbar;

import android.app.Activity;
import android.util.Log;
import android.view.View;

import android.support.design.widget.Snackbar;

import com.facebook.react.common.ReactConstants;
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

  private static final String LENGTH_SHORT_KEY = "SHORT";
  private static final String LENGTH_LONG_KEY = "LONG";

  public ReactSnackbarModule(ReactApplicationContext reactContext, View rootView) {
    super(reactContext);
    mRootView = rootView;
  }

  @Override
  public String getName() {
    return "SnackbarAndroid";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(LENGTH_SHORT_KEY, Snackbar.LENGTH_SHORT);
    constants.put(LENGTH_LONG_KEY, Snackbar.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void show(String message, int length) {
    Snackbar snackbar = Snackbar.make(
      mRootView, message, length);
    snackbar.show();
  }
}
