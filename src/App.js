import React, { useState } from "react";
import { AmplifyTheme, Authenticator } from 'aws-amplify-react'; 
import "./App.css";

function App() {
  const user, setUser = useState(null);

  render() {
    return !user? (
      <Authenticator theme={theme}></Authenticator>
    ) : <div>App</div>;
  }
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'var(--amazonOrange)'
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: 'var(--lightSquidInk)',
    color: 'white'
  }

}

// export default withAuthenticator(App, true, [], null, theme);
export default Appl
