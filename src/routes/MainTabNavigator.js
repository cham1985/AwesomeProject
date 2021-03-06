import React, {useEffect} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../pages/HomePage';
import MinePage from '../pages/MinePage';
import routes from './routes';
import CustomNavigationBar from '../components/CustomNavigationBar';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native';
import SafeView from '../components/SafeView';
import {useAndroidBackHandler} from '@RNProjectTools';
const Tab = createMaterialBottomTabNavigator();

const MainTabNavigator = (props) => {
  // console.log('MainTabNavigator.js props=', props);
  const {navigation, route} = props;
  const {state} = route;
  const {setOptions} = navigation; //在具体页面内设置 ScreenOptions https://www.jianshu.com/p/a2582f8b16fd
  const {colors} = useTheme();

  /**
   * 避免安卓用户在首页时按后退按键后直接退出app
   * Prevent Android users from exiting the app directly after pressing the back button on the homepage
   */
  useAndroidBackHandler({
    navigation,
  });

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      //todo
      //componentWillUnmount
      return () => {
        console.log('MainTabNavigator componentWillUnmount');
      };
    },
    [],
  );

  /*
 componentDidUpdate
 */
  useEffect(() => {
    console.log('MainTabNavigator componentDidUpdate props=', props);
    let headerShown = false,
      headerTitle = '',
      rightComp = null;
    if (state && state.index === 1) {
      headerShown = true;
    }
    if (state) {
      let routeName = state.routeNames[state.index];
      headerTitle = routes[routeName].headerTitle;
      rightComp = routes[routeName].rightComp;
    }
    console.log(
      'MainTabNavigator componentDidMount setOptions headerShown=',
      headerShown,
    );
    //控制一级页面顶部公用的导航栏是否显示
    setOptions({
      header: (props) => (
        <CustomNavigationBar {...props} rightComp={rightComp} />
      ),
      headerTitle,
      headerShown,
    });
  });
  const tabBarColor = colors.primary;

  return (
    // https://reactnavigation.org/docs/material-bottom-tab-navigator/
    <Tab.Navigator
      initialRouteName={routes.HomePage.routeName}
      shifting={true} //是否开启动效,也就是选中时 不显示text
      activeColor={colors.accent}
      inactiveColor={colors.text}>
      <Tab.Screen
        key={routes.HomePage.routeName}
        name={routes.HomePage.routeName}
        component={HomePage}
        options={{
          tabBarLabel: '首页',
          tabBarColor: tabBarColor,
          tabBarIcon: ({color, focused}) => {
            console.log(
              'MainTabNavigator.js HomePage tabBarIcon focused=',
              focused,
            );
            return <Icon name="ios-home" color={color} size={22} />;
          },
        }}
      />
      <Tab.Screen
        key={routes.MinePage.routeName}
        name={routes.MinePage.routeName}
        component={MinePage}
        options={{
          tabBarLabel: '我的',
          tabBarColor: tabBarColor,
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
