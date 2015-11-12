package com.lugg.ReactSnackbar;

import com.lugg.ReactSnackbar.ReactSnackbarModule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import android.view.View;
import android.util.Log;

public class ReactSnackbarPackage implements ReactPackage {
    private View mRootView = null;

    // hold a reference to the root view
    public ReactSnackbarPackage(View rootView) {
        mRootView = rootView;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
            new ReactSnackbarModule(reactContext, mRootView)
        );
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
