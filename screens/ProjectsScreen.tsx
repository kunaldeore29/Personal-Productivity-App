/* The code snippet is importing necessary modules and functions for a React Native project. Here's a
breakdown of what each import statement is doing: */
import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../types';

/* This code snippet defines a React functional component named `ProjectsScreen`. Here's a breakdown of
what the code is doing within this component: */
export default function ProjectsScreen() {
  const { tasks, setTasks } = useTasks();

  const fadeAnimMap = useRef<{ [key: number]: Animated.Value }>({}).current;

  const projectTasks = tasks.filter((t: Task) => t.status === 'project');

  const deleteTask = (id: number) => {
    setTasks((prevTasks: Task[]) => prevTasks.filter((t: Task) => t.id !== id));
  };

  /**
   * The function `markCompleted` updates a task's completion status, animates its removal, and then
   * removes it from the task list.
   * @param {number} id - The `id` parameter in the `markCompleted` function is a number that
   * represents the unique identifier of a task that needs to be marked as completed.
   */
  const markCompleted = (id: number) => {
    if (!fadeAnimMap[id]) {
      fadeAnimMap[id] = new Animated.Value(1);
    }

    // Mark as completed
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((t: Task) =>
        t.id === id ? { ...t, completed: true } : t
      )
    );

    // Animate and then remove
    Animated.timing(fadeAnimMap[id], {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTasks((prevTasks: Task[]) => prevTasks.filter((t: Task) => t.id !== id));
      delete fadeAnimMap[id];
    });
  };

  /**
   * The function `moveToNextAction` updates the status of a task with a specific ID to 'next_action'
   * in a list of tasks.
   * @param {number} id - The `id` parameter in the `moveToNextAction` function is a number that
   * represents the unique identifier of a task.
   */
  const moveToNextAction = (id: number) => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((t: Task) =>
        t.id === id ? { ...t, status: 'next_action' } : t
      )
    );
  };

 /* This part of the code is rendering a list of tasks within a `FlatList` component. Here's a
 breakdown of what it's doing: */
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects</Text>
      <FlatList
        data={projectTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (!fadeAnimMap[item.id]) {
            fadeAnimMap[item.id] = new Animated.Value(1);
          }

         /* This part of the code is rendering each task item within the `FlatList` component. Here's a
         breakdown of what it's doing: */
          return (
            <Animated.View style={{ opacity: fadeAnimMap[item.id] }}>
              <View style={styles.taskItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {item.title}
                    {item.completed ? ' ✅' : ''}
                  </Text>
                  {item.project ? (
                    <Text style={styles.meta}>Project: {item.project}</Text>
                  ) : null}
                </View>

                <View style={styles.actions}>
                  {!item.completed && (
                    <TouchableOpacity onPress={() => markCompleted(item.id)}>
                      <Text style={styles.actionBtn}>✔️</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => moveToNextAction(item.id)}>
                    <Text style={styles.actionBtn}>➤</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Text style={styles.actionBtn}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

/* The `const styles` object created using `StyleSheet.create` in the code snippet is defining a set of
styles for various elements within the `ProjectsScreen` component. Here's a breakdown of what each
style definition is doing: */
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: { fontSize: 16, fontWeight: '500' },
  meta: { fontSize: 12, color: '#666' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 10,
  },
  actionBtn: {
    fontSize: 18,
    marginLeft: 8,
  },
});
