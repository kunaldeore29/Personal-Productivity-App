/* The code snippet is importing necessary modules and components for a React Native application.
Here's a breakdown of what each import statement is doing: */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../types';

/* This code snippet is defining a functional component named `InboxScreen` that is exported as the
default export. The component takes a prop `navigation` as an object. Inside the component function: */
export default function InboxScreen({ navigation }: any) {
  const { tasks, setTasks } = useTasks();
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [project, setProject] = useState('');
  const [context, setContext] = useState('');

/**
 * The `addTask` function adds a new task with specified properties to the tasks array and resets the
 * input text.
 * @returns If the `text` variable is empty or only contains whitespace characters, the function
 * `addTask` will return early without adding a new task to the `tasks` array.
 */
  const addTask = () => {
    if (text.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      title: text,
      status: 'inbox',
      completed: false,
      project: '',
      context: '',
    };
    setTasks([...tasks, newTask]);
    setText('');
  };

 /**
  * The `deleteTask` function filters out a task with a specific id from a list of tasks.
  * @param {number} id - The `id` parameter is a number representing the unique identifier of the task
  * that needs to be deleted.
  */
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t: Task) => t.id !== id));
  };

/**
 * The `moveToProjects` function updates the status of a task to 'project' based on its ID.
 * @param {number} id - The `id` parameter in the `moveToProjects` function is a number that represents
 * the unique identifier of a task.
 */
  const moveToProjects = (id: number) => {
    setTasks(
      tasks.map((t: Task) =>
        t.id === id ? { ...t, status: 'project' } : t
      )
    );
  };

/**
 * The function `openNextActionModal` sets selected task ID, project, context, and makes the modal
 * visible in a TypeScript React application.
 * @param {number} id - The `id` parameter is a number that is used to identify a specific task or
 * action.
 */
  const openNextActionModal = (id: number) => {
    setSelectedTaskId(id);
    setProject('');
    setContext('');
    setModalVisible(true);
  };

  /**
   * The function `confirmNextAction` updates the status of a selected task to 'next_action' and closes
   * a modal.
   * @returns The `confirmNextAction` function is returning `undefined`.
   */
  const confirmNextAction = () => {
    if (!selectedTaskId) return;
    setTasks(
      tasks.map((t: Task) =>
        t.id === selectedTaskId
          ? { ...t, status: 'next_action', project, context }
          : t
      )
    );
    setModalVisible(false);
  };

  /* The line `const inboxTasks = tasks.filter((t: Task) => t.status === 'inbox');` is creating a new
  array called `inboxTasks` by filtering the `tasks` array based on a specific condition. */
  const inboxTasks = tasks.filter((t: Task) => t.status === 'inbox');

  /* This portion of the code is returning the JSX (JavaScript XML) markup that represents the UI of
  the `InboxScreen` component in a React Native application. Here's a breakdown of what each element
  is doing: */
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>

      <TextInput
        placeholder="New task..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={inboxTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openNextActionModal(item.id)}>
                <Text style={styles.actionBtn}>➤</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.actionBtn}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button
        title="Go to Next Actions"
        onPress={() => navigation.navigate('NextActions')}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign Project & Context</Text>
            <TextInput
              placeholder="Project (e.g., Work)"
              value={project}
              onChangeText={setProject}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Context (e.g., @home)"
              value={context}
              onChangeText={setContext}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={confirmNextAction} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* The `const styles = StyleSheet.create({ ... })` block in the code snippet is defining a JavaScript
object that contains various style definitions using the `StyleSheet.create` method provided by
React Native. Each key in the object represents a specific style class that can be applied to
different elements in the React Native component. */
const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskTitle: { fontSize: 16, flex: 1 },
  actions: { flexDirection: 'row', gap: 12 },
  actionBtn: { fontSize: 18, marginLeft: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    gap: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
