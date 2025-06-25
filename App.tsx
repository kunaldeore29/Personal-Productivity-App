/* These lines of code are importing necessary modules and components for a React Native application.
Here is a breakdown of each import statement: */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { TaskProvider } from './contexts/TaskContext'; 
import 'react-native-gesture-handler';

/**
 * The App component returns a TaskProvider wrapped NavigationContainer with AppNavigator component
 * inside in a TypeScript React application.
 * @returns The `App` function is returning a JSX structure that includes a `TaskProvider` component
 * wrapping a `NavigationContainer` component, which in turn contains an `AppNavigator` component.
 */
export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
