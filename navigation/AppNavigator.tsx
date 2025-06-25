/* The code snippet you provided is setting up a navigation stack using React Navigation in a
TypeScript React application. Here's a breakdown of what each import statement is doing: */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InboxScreen from '../screens/InboxScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import NextActionsScreen from '../screens/NextActionsScreen';
import AddTaskScreen from '../screens/AddTaskScreen';

/* `const Stack = createNativeStackNavigator();` is creating a stack navigator using the
`createNativeStackNavigator` function provided by the `@react-navigation/native-stack` package. This
stack navigator will be used to manage the navigation stack in the application, allowing for
navigation between different screens/components defined in the navigator. */
const Stack = createNativeStackNavigator();

/**
 * The AppNavigator function returns a Stack Navigator component with screens for Inbox, Projects,
 * NextActions, and AddTask.
 * @returns A function named AppNavigator is being returned. This function defines a navigation stack
 * using React Navigation's Stack.Navigator component. The initial route is set to "Inbox" and there
 * are four screens defined within the stack: InboxScreen, ProjectsScreen, NextActionsScreen, and
 * AddTaskScreen.
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Inbox">
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="NextActions" component={NextActionsScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      
    </Stack.Navigator>
  );
}