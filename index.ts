/* The code `import { registerRootComponent } from 'expo';` is importing the `registerRootComponent`
function from the 'expo' library. This function is typically used in Expo projects to register the
root component of the application. */

import { registerRootComponent } from 'expo';
import 'react-native-gesture-handler';

/* The code `import App from './App';` is importing the default export from the file located at
'./App'. This means that the code is importing the component or module exported as the default
export from the 'App.tsx' or 'App.js' file. */
import App from './App';

registerRootComponent(App);
