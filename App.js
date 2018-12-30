/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ListScreen from './src/screens/ListScreen';
import Cart from './src/screens/Cart';
import Detail from './src/screens/Detail';
import { createBottomTabNavigator, BottomTabBar, createMaterialBottomTabNavigator } from 'react-navigation-tabs';

// Screen

const AppNavigator = createStackNavigator(
	{
		ListScreen,
		Cart,
		Detail
	},
	{
		initialRouteName: 'ListScreen'
	}
);

export default createAppContainer(AppNavigator);
