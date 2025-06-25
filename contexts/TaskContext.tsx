/* The code snippet is importing necessary modules and functions from the React and AsyncStorage
libraries in a TypeScript React application. Here's a breakdown of the imports: */
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* `const TaskContext = createContext<any>(null);` is creating a new context object in React using the
`createContext` function. The `createContext` function takes an argument that represents the default
value of the context. In this case, the default value is set to `null` and the context is of type
`any`. This context object will be used to share state and functions between components that are
descendants of the `TaskProvider` component. */
const TaskContext = createContext<any>(null);

/* The `TaskProvider` function is a component in a React application that serves as a provider for the
`TaskContext`. It takes a destructured `children` prop as an argument. Within the `TaskProvider`
component: */
export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<string[]>([]);

 /* The `useEffect` hook in the code snippet is used to perform side effects in a functional component.
 In this specific case: */
  useEffect(() => {
    const loadData = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedProjects = await AsyncStorage.getItem('projects');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedProjects) setProjects(JSON.parse(storedProjects));
    };
    loadData();
  }, []);

/* The `useEffect` hook in the provided code snippet is responsible for saving the `tasks` and
`projects` state variables to the AsyncStorage whenever they change. */
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    AsyncStorage.setItem('projects', JSON.stringify(projects));
  }, [tasks, projects]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, projects, setProjects }}>
      {children}
    </TaskContext.Provider>
  );
};
/**
 * The useTasks function is a custom hook in TypeScript React that retrieves and returns the context of
 * TaskContext.
 */
export const useTasks = () => useContext(TaskContext);