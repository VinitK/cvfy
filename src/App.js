import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import { auth, createUserProfileDoc } from './firebase/auth.util';
import { setCurrentUser } from './redux/user/user.actions';

import FooterComp from './components/sections/footer/footer.component';
import HomePage from './components/pages/home/home.component.jsx';
import CvPage from './components/pages/cv/cv.component';

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

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)

export default connect(null, mapDispatchToProps)(App);