import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import { auth, createUserProfileDoc } from './firebase/auth.util';
import { setCurrentUser } from './redux/user/user.actions';

import LoadingComp from './components/sections/loading/loading.component';
import ErrorComp from './components/sections/error/error.component';
const HomePage = lazy(() => import('./components/pages/home/home.component.jsx'));
const CvPage = lazy(() => import('./components/pages/cv/cv.component'));

function App({ setCurrentUser }) {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(userSnap => {
          setCurrentUser({
            id: userSnap.id,
            ...userSnap.data()
          });
        });
      } else {
        setCurrentUser(userAuth)
      }
    });
    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);

  return (
    <div className="App">
      <ErrorComp>
        <Suspense fallback={<LoadingComp />}>
          <Switch>
            <Route path='/cv'>
              <CvPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </ErrorComp>
    </div>
  );
}

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)

export default connect(null, mapDispatchToProps)(App);