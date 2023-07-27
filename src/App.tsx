import React from 'react';
import { Provider } from 'react-redux'
import {store} from "./redux/store"

import './App.scss';
import { RouterProvider } from "react-router-dom";
import router from './route'

import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidebar/>
        <div className="AppWrapper">
          <RouterProvider router={router} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
