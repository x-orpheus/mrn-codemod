# MRN-CODEMOD
[![coverage report](https://g.hz.netease.com/NeteaseMusicUI/react-native/rn-codemod/badges/feature/framework/coverage.svg)](https://g.hz.netease.com/NeteaseMusicUI/react-native/rn-codemod/commits/feature/framework)
[![pipeline status](https://g.hz.netease.com/NeteaseMusicUI/react-native/rn-codemod/badges/feature/framework/pipeline.svg)](https://g.hz.netease.com/NeteaseMusicUI/react-native/rn-codemod/commits/feature/framework)

## Description

Codemod for updateing ReactNative projects by NetEase Cloud Music team

## Usage
```
mrn-codemod transform [options] <sourceDirectory>
```

```
Commands:
  transform [options] <sourceDirectory>
  
    --f Bypass Git safety checks and forcibly run codemods

Examples:
  $ mrn-codemod transform src
  $ mrn-codemod transform src -f
```

## Included Transform Rules

### `Navigator`

- replace `Navigator` with `react-native-deprecated-custom-components`
<!-- - replace `NavigatorIOS` with `@music/rn-deprecated-navigator-ios` -->
- Navigator.props.sceneStyle must be a plain object, not a stylesheet!

[ChangeLog Source](https://github.com/facebookarchive/react-native-custom-components)

### `Image.resizeMode`

- Stop expose `Image.resizeMode`. Exposing this enum is essentially useless and at worst is a runtime cost that isn't necessary by just using the string.

[ChangeLog Source](https://github.com/facebook/react-native/commit/870775ee738e9405c6545500f9a637df9b513a02)

### `export-default-declaration`

- Export default declaration cannot be undefined.

[ChangeLog Source](https://github.com/magicismight/react-native-lazyload/issues/42)

<!-- ### `ListView`

- `ListView` Component has been deprecated

[ChangeLog Source](https://facebook.github.io/react-native/blog/2017/03/13/better-list-views.html) -->

### `image-children`

- Image cannot contain children, instead of ImageBackground.

[ChangeLog Source](https://facebook.github.io/react-native/docs/images.html#background-image-via-nesting)

### `nest`

- Text cannot contain View.


### `PropTypes`

- Replaces `React.PropTypes` references with `prop-types`.

[ChangeLog Source](https://github.com/facebook/prop-types)

### `view-propTypes`

- Replaces `View.propTypes` references with `ViewPropTypes` and adds the appropriate `import` or `require` statement. This codemod is intended for ReactNative 44+..

[ChangeLog Source](https://github.com/react-navigation/react-navigation/issues/1352)


