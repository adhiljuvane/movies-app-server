import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import NavBar from "./views/NavBar/NavBar";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LandingPage from "./views/LandingPage/LandingPage";
import Footer from "./views/Footer/Footer";
import MovieDetailPage from "./views/MovieDetailPage/MovieDetailPage";
import FavouritePage from "./views/FavouritePage/FavouritePage";
import FriendsPage from "./views/FriendsPage/FriendsPage";
import PublicProfile from "./views/PublicProfile/PublicProfile";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetailPage, null)}
          />
          <Route
            exact
            path="/favourite"
            component={Auth(FavouritePage, null)}
          />
          <Route exact path="/friends" component={Auth(FriendsPage, null)} />
          <Route
            exact
            path="/profile/:id"
            component={Auth(PublicProfile, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
