import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { AmplifyTheme, Authenticator } from "aws-amplify-react";
import "./App.css";

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

  const onAuthEvent = ( {payload} ) => {
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

  return !user ? <Authenticator theme={theme}/> : <div>App</div>;
}

export default App;
