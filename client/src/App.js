import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { setAuthToken } from "./utility/addAuthHeader"
import React, {Suspense, lazy} from "react"
import {connect, Provider } from "react-redux"

//Import Redux
import store from "./store"

//CSS
import './App.css';


import Loading from "./components/layout/loading"
import PrivateRoute from "./components/auth/PrivateRoute"

//Components
const Navbar =  lazy(() => import("./components/layout/Navbar"))
const Landing =  lazy(() => import("./components/layout/Landing"))
const Login =  lazy(() => import("./components/auth/Login"))
const Dashboard =  lazy(() => import("./components/dashboard/Dashboard"))
const CreateProfile =  lazy(() => import("./components/Profile-form/CreateProfile"))
const Register =  lazy(() => import("./components/auth/Register"))
const Alert = lazy(() => import("./components/layout/Alert"))
const EditProfile = lazy(() => import("./components/Profile-form/EditProfile"))
const AddEducation = lazy(() => import("./components/Profile-form/AddEducation"))
const AddExperience = lazy(() => import("./components/Profile-form/AddExperience"))
const Profiles = lazy(() => import("./components/profile/Profiles"))
const Profile = lazy(() => import("./components/profile/Profile"))
const Posts = lazy(() => import("./components/post/Posts"))
const Post = lazy(() => import("./components/post/Post"))


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loading />}>
          <>
            <Navbar />
            <Route exact path="/" component={Landing} />
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
            </>
          </Suspense>  
      </Router>
    </Provider>
  )
}
connect()(App)
 

