/* The `import` statements in the code snippet are used to import necessary modules and functions from
external libraries or files. Here's a breakdown of what each import statement is doing: */
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTasks } from '../contexts/TaskContext';

/* The code snippet is defining a functional component named `AddTaskScreen` using the `export default`
syntax, which means this component is the default export of the file. Within this component: */
export default function AddTaskScreen() {
  const { setTasks, projects } = useTasks();
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [context, setContext] = useState('');

  /**
   * The `addTask` function adds a new task with specified properties to a list of tasks and resets
   * input fields.
   * @returns A new task object is being returned with the following properties:
   * - id: A unique identifier generated using Date.now()
   * - title: The value of the title variable
   * - project: The value of the project variable
   * - context: The value of the context variable
   * - status: 'next_action'
   * - completed: false
   */
  const addTask = () => {
    if (title.trim() === '') return;
    setTasks((prev: any) => [
      ...prev,
      {
        id: Date.now(),
        title,
        project,
        context,
        status: 'next_action',
        completed: false
      },
    ]);
    setTitle('');
    setProject('');
    setContext('');
  };

/* The `return` statement in the code snippet is returning a JSX (JavaScript XML) expression that
represents the UI structure of the `AddTaskScreen` component. Here's a breakdown of what the JSX
code is rendering: */
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Add Task</Text>
      <TextInput placeholder="Task Title" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Project" value={project} onChangeText={setProject} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <TextInput placeholder="Context (e.g., @home)" value={context} onChangeText={setContext} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}