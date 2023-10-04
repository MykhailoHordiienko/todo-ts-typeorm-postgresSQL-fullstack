import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './modules/app';

// ReactDOM.render(
//   <React.StrictMode>
//     <AppContainer />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
