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

public class ReactSnackbarModule extends ReactContextBaseJavaModule {
  private View mRootView = null;

  public ReactSnackbarModule(ReactApplicationContext reactContext, View rootView) {
    super(reactContext);
    mRootView = rootView;
  }

  @Override
  public String getName() {
    return "SnackbarAndroid";
  }

  @ReactMethod
  public void show(String message) {
    Log.d("ReactNative", "show message!");

    Snackbar snackbar = Snackbar.make(
      mRootView, message, Snackbar.LENGTH_LONG);
    snackbar.show();
  }
}
