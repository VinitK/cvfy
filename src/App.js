import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import LoadingComp from './components/sections/loading/loading.component';
import FooterComp from './components/sections/footer/footer.component';

const HomePage = lazy(() => import('./components/pages/home/home.component.jsx'));
const CvPage = lazy(() => import('./components/pages/cv/cv.component'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingComp />}>
        <Switch>
          <Route path='/cv' component={CvPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Suspense>
      <FooterComp />
    </div>
  );
}

export default App;