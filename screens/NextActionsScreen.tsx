/* The code snippet is importing necessary modules and components for a React Native application.
Here's a breakdown of the imports: */
import React, { useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';

/**
 * The `NextActionsScreen` component in TypeScript React manages a list of tasks with animations for
 * completion and removal.
 * @returns The `NextActionsScreen` component is being returned. It renders a list of tasks filtered by
 * the 'next_action' status. Each task item is wrapped in an `Animated.View` component with opacity
 * controlled by the `fadeAnimMap` animation values. The `handleComplete` function is used to mark
 * tasks as completed, animate their fade out, and remove them from the list after the animation
 * completes
 */
export default function NextActionsScreen() {
  const { tasks, setTasks } = useTasks();

  // Store animation values for each task ID
  const fadeAnimMap = useRef<{ [key: number]: Animated.Value }>({}).current;

  const handleComplete = (id: number) => {
    // Create animation value if it doesn't exist
    if (!fadeAnimMap[id]) {
      fadeAnimMap[id] = new Animated.Value(1);
    }

    // Mark task as completed
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((t: Task) =>
        t.id === id ? { ...t, completed: true } : t
      )
    );

    // Animate fade out
    Animated.timing(fadeAnimMap[id], {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // After animation, remove task
      setTasks((prevTasks: Task[]) => prevTasks.filter((t: Task) => t.id !== id));
      delete fadeAnimMap[id]; // Clean up
    });
  };

  const nextActionTasks = tasks.filter((t: Task) => t.status === 'next_action');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Next Actions</Text>
      <FlatList
        data={nextActionTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Initialize fade animation if not already
          if (!fadeAnimMap[item.id]) {
            fadeAnimMap[item.id] = new Animated.Value(1);
          }

          return (
            <Animated.View style={{ opacity: fadeAnimMap[item.id] }}>
              <TaskItem task={item} onComplete={handleComplete} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});
