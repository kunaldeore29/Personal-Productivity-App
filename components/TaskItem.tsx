/* The code snippet is importing necessary modules and types for a React Native component. Here's what
each import statement is doing: */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';

/**
 * The TaskItemProps type defines props for a task item component in TypeScript React, including task
 * data, complete function, and optional long press function.
 * @property {Task} task - The `task` property in `TaskItemProps` is of type `Task`, which likely
 * represents a single task object containing information such as task title, description, due date,
 * etc.
 * @property onComplete - The `onComplete` property is a function that takes an `id` parameter of type
 * `number` and returns `void`. It is used to mark a task as complete.
 * @property onLongPress - The `onLongPress` property in the `TaskItemProps` type is a function that is
 * optional and can be used to handle a long press event on the task item. It is a callback function
 * that does not take any arguments and does not return anything.
 */
type TaskItemProps = {
  task: Task;
  onComplete: (id: number) => void;
  onLongPress?: () => void; // <-- Add this
};

/**
 * The TaskItem component in TypeScript React renders a task with the ability to mark it as complete
 * and trigger a long press event.
 * @param {TaskItemProps}  - The `TaskItem` component takes three props:
 * @returns The `TaskItem` function component is being returned. It takes in props `task`,
 * `onComplete`, and `onLongPress`, and renders a `TouchableOpacity` component with a `Text` component
 * inside. The `onPress` event is hooked up to call `onComplete` with the `task.id`, and the
 * `onLongPress` event is hooked up to the provided `on
 */
export default function TaskItem({ task, onComplete, onLongPress }: TaskItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onComplete(task.id)}
      onLongPress={onLongPress} // <-- Hook up the long press
      style={styles.taskContainer}
    >
      <Text style={[styles.taskText, task.completed && styles.completed]}>
        {task.title} {task.context ? `(${task.context})` : ''}
      </Text>
    </TouchableOpacity>
  );
}

/* The `const styles = StyleSheet.create({ ... })` block is defining styles using the
`StyleSheet.create` method provided by React Native. This method is used to create reusable style
objects that can be applied to components in a performant way. */
const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
