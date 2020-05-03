import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./components/auth/sign-up/SignUp";
import SignIn from "./components/auth/sign-in/SignIn";
import { useQuery } from "react-apollo";
import { GET_CURRENT_USER } from "./queries/index";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);
  console.log(data, "app", loading, error);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
        <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
