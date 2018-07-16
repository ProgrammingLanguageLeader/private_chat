import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import chatApp from './reducers';

const store = createStore(chatApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();

// const playlist = (state = [], action) => {
//   console.log(action);
//   state = {
//     payload: action.payload
//   };
//   return state;
// }

// const store = createStore(playlist);

// store.subscribe( () => {
//   let state = store.getState();
//   console.log(`payload = ${state.payload}`);
// })

// store.dispatch(
//   {
//     type: 'SOME_ACTION',
//     payload: 'Ура'
//   }
// )

// store.dispatch(
//   {
//     type: 'ANOTHER_ACTION',
//     payload: 'Еще одно ура'
//   }
// )
