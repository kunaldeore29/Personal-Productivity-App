export type Task = {
  id: number;
  title: string;
  status: 'inbox' | 'project' | 'next_action';
  completed: boolean;
  project: string;
  context: string;
};
/**
 * The type Task represents a task with specific properties such as id, title, status, completed,
 * project, and context.
 * @property {number} id - The `id` property in the `Task` type represents a unique identifier for each
 * task. It is of type `number`.
 * @property {string} title - The `title` property in the `Task` type represents the title or name of
 * the task. It is a string type property.
 * @property {'inbox' | 'project' | 'next_action'} status - The `status` property in the `Task` type
 * represents the current status of the task and can have one of three possible values: 'inbox',
 * 'project', or 'next_action'.
 * @property {boolean} completed - The `completed` property in the `Task` type is a boolean value that
 * indicates whether the task has been completed or not. It can be either `true` if the task is
 * completed or `false` if it is not completed.
 * @property {string} project - The `project` property in the `Task` type represents the project to
 * which the task belongs. It is a string type property that specifies the project name or identifier
 * associated with the task.
 * @property {string} context - The `context` property in the `Task` type represents the specific
 * situation or environment in which the task needs to be completed. It provides additional information
 * about the task that can help in organizing and prioritizing it within a project or workflow.
 */
