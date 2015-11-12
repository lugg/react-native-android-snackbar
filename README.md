# Snackbar for React Native in Android

Expose the [Snackbar android widget](http://developer.android.com/reference/android/support/design/widget/Snackbar.html) for react-native apps.

Snackbar provides a lightweight feedback to users about an operation, such as saving a form or deleting a message. They are similar to Toasts, but are a bit more prominent and customizable.

Fore more info please refer to the [Google design spec on Snackbars](https://www.google.com/design/spec/components/snackbars-toasts.html#).


## Usage

```
var SnackbarAndroid = require('react-native-android-snackbar');

SnackbarAndroid.show('Hello World!');
```

[Check full example](Example/index.android.js).


## Setup

1. Include this module in `android/settings.gradle`:
  
  ```
  include ':ReactSnackbar',
  include ':app'

  project(':ReactSnackbar').projectDir = new File(rootProject.projectDir,
    '../node_modules/react-native-android-snackbar/android')
  ```
2. Add a dependency to your app build in `android/app/build.gradle`:
  
  ```
  dependencies {
      ...
      compile project(':ReactSnackbar')
  }
  ```
3. Change your main activity to add a new package, in `android/app/src/main/.../MainActivity.java`:
  
  ```java
  import com.lugg.ReactSnackbar.ReactSnackbarPackage; // Add new import

  public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

      private ReactInstanceManager mReactInstanceManager;
      private ReactRootView mReactRootView;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          mReactRootView = new ReactRootView(this);

          mReactInstanceManager = ReactInstanceManager.builder()
                  .setApplication(getApplication())
                  .setBundleAssetName("index.android.bundle")
                  .setJSMainModuleName("index.android")
                  .addPackage(new MainReactPackage())
                  .addPackage(new ReactSnackbarPackage(mReactRootView)) // add the package here
                  .setUseDeveloperSupport(BuildConfig.DEBUG)
                  .setInitialLifecycleState(LifecycleState.RESUMED)
                  .build();
  ```

