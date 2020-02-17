import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import FooterComp from './components/sections/footer/footer.component';
import HomePage from './components/pages/home/home.component.jsx';
import CvPage from './components/pages/cv/cv.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/cv'>
          <CvPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      <FooterComp />
    </div>
  );
}

export default App;