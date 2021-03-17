/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import {sentryLog} from './src/sentry/sentry'; //init sentry
import App from './src/App';
import {name as appName} from './app.json';
import constant from './src/constants/constant';

if (!constant.fakeData) {
  // release package
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    assert: () => {},
  };
} else {
  // console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key']
  // LogBox.ignoreLogs('Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key')
  // console.disableYellowBox = true //
  // LogBox.ignoreAllLogs(true)
  console.disableYellowBox = true;
}

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en');
}

AppRegistry.registerComponent(appName, () => App);
