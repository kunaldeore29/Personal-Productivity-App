Personal Productivity App (React Native + Expo) :-
This is a simple task management app based on the Getting Things Done (GTD) method. You can add tasks, organize them into projects or next actions, and assign them contexts like @home or @work.

Features :-
1. Add, edit, and delete tasks
2. View tasks in Inbox, Projects, or Next Actions
3. Assign tasks to different contexts (e.g., @home, @office)
4. Save tasks locally on your phone (data stays even after closing app)

Technologies Used :-
1. React Native
2. Expo
3. TypeScript
4. React Navigation
5. AsyncStorage

How to Run the App (using Expo Go):-
1. Make sure you have Node.js and npm installed.
2. Open a terminal and go to the project folder.
Then install the required libraries:
( npm install )
3.Start the app:
( npm start )
4. On your mobile phone:
> Install the Expo Go app from the Play Store or App Store.
> Open Expo Go and scan the QR code shown in your terminal or browser.
> The app will open on your phone.

Folder Overview :-
> screens/ — all the app screens (Inbox, Projects, Next Actions, Add Task)
> components/ — reusable parts like task list items
> contexts/ — shared data (all tasks) using Context API
> navigation/ — handles screen switching
> types.ts — defines what a task looks like
> App.tsx — starting point of the app

GTD Process Mapping :-
> Inbox → for collecting all tasks
> Add Task → to organize or assign them
> Projects → group tasks by outcome
> Next Actions → what you need to do next

Thank You
