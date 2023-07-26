import React from 'react';
import './App.scss';
import { RouterProvider } from "react-router-dom";
import router from './route'

import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
