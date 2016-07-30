# Snackbar for React Native in Android

Expose the [Snackbar android widget](http://developer.android.com/reference/android/support/design/widget/Snackbar.html) for react-native apps.

![Snackbar demo](/Example/snackbar.gif?raw=true)

Snackbar provides a lightweight feedback to users about an operation, such as saving a form or deleting a message. They are similar to Toasts, but are a bit more prominent and customizable.

Fore more info please refer to the [Google design spec on Snackbars](https://www.google.com/design/spec/components/snackbars-toasts.html#).


## Usage

Require it:

```js
import Snackbar from 'react-native-android-snackbar';
```

Then call:

```
Snackbar.show('Hello World!', options);
```

Available options:

- `duration`: one of: `Snackbar.SHORT`, `Snackbar.LONG`, `Snackbar.INDEFINITE` or `Snackbar.UNTIL_CLICK`
- `actionLabel`: text to show at the right of the snackbar
- `actionColor`: color of the action text in the snackbar. Like `red` or `#FFCA00`
- `actionCallback`: function to be evoked after the user clicks the snackbar. Keep in mind the snackbar will automatically close just before this function call

[Check full example](Example/index.android.js).

To dismiss the currently active Snackbar early (for example, when changing scenes in your app), you can call:

```js
Snackbar.dismiss();
```

## Setup

1. Include this module in `android/settings.gradle`:

```
include ':react-native-android-snackbar'
project(':react-native-android-snackbar').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-android-snackbar/android')
include ':app'
```

2. Add a dependency to your app build in `android/app/build.gradle`:

```
dependencies {
   ...
   compile project(':react-native-android-snackbar')
}
```

3. Change your main application to add a new package, in `android/app/src/main/.../MainApplication.java`:

```java
import com.lugg.ReactSnackbar.ReactSnackbarPackage; // Add new import

public class MainApplication extends Application implements ReactApplication {
  ...
  
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new ReactSnackbarPackage() // Add the package here
    );
  }
}
```
