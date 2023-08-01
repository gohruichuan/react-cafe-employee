import React from 'react';
import { Provider } from 'react-redux'
import {store} from "./redux/store"
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import router from './route'

import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Sidebar/>
          <div className="AppWrapper">
            <Routes>
              {router.map((route, index) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
            {/* <RouterProvider router={router} /> */}
            {/* <Switch> */}

          {/* </Switch> */}
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
