import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { AmplifyTheme, Authenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import NavBar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser({ user }) : setUser(null);
    } catch (err) {
      setUser(null);
    }
  };

  const handleSignOut = async () =>{
    try {
    await Auth.signOut()
    } catch(err) {
      console.error('Error signing out user', err)
    }
  }

  const onAuthEvent = ({ payload }) => {
    switch (payload.event) {
      case "signIn":
        console.log("signed in");
        getUserData();
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out");
        setUser(null);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getUserData();
    Hub.listen("auth", (data) => {
      onAuthEvent(data);
      console.log(
        "A new auth event has happened: ",
        data.payload.data.username + " has " + data.payload.event
      );
    });
  }, []);

  const theme = {
    ...AmplifyTheme,
    button: {
      ...AmplifyTheme.button,
      backgroundColor: "var(--amazonOrange)",
    },
    sectionBody: {
      ...AmplifyTheme.sectionBody,
      padding: "5px",
    },
    navBar: {
      ...AmplifyTheme.navBar,
      backgroundColor: "var(--lightSquidInk)",
      color: "white",
    },
  };

  return !user ? (
    <Authenticator theme={theme} />
  ) : (
    <Router>
      <React.Fragment>
        {/* NavBar */}
        <NavBar user={user} handleSignOut={handleSignOut}/>

        {/* Routes */}
        <div className="app-container" />
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/markets/:marketId">
          <MarketPage />
        </Route>
      </React.Fragment>
    </Router>
  );
}

export default App;

// xjtjdgjaxlukupmdel@zqrni.com
