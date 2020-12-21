import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { setAuthToken } from "./utility/addAuthHeader"
import React from "react"
import {connect, Provider } from "react-redux"

//Import Redux
import store from "./store"

//CSS
import './App.css';

//Components
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import PrivateRoute from "./components/auth/PrivateRoute"
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/Dashboard"
import CreateProfile from "./components/Profile-form/CreateProfile"
import Register from "./components/auth/Register"
import Alert from "./components/layout/Alert"
import EditProfile from "./components/Profile-form/EditProfile"
import AddEducation from "./components/Profile-form/AddEducation"
import AddExperience from "./components/Profile-form/AddExperience"
import Profiles from "./components/profile/Profiles"
import Profile from "./components/profile/Profile"
import Posts from "./components/post/Posts"
import Post from "./components/post/Post"


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <PrivateRoute  exact path="/post/:id" component={Post} />
            <PrivateRoute  exact path="/posts" component={Posts} />
            <Route exact path={`/profile/:id`} component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute 
              exact
              path="/add-education"
              component={AddEducation}
            />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience} 
            />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
}
connect()(App)
 

