import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import Flightprovider from "./context/Flightprovider";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./config/fbConfig";
// import { isLoaded } from "react-redux-firebase";

import App from "./App";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// function AuthIsLoaded({ children }) {
//   const auth = useSelector((state) => state.firebase.auth);
//   if (!isLoaded(auth)) return <div>splash screen...</div>;
//   return children;
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Flightprovider>
          <App />
        </Flightprovider>
      </ReactReduxFirebaseProvider>
    </React.StrictMode>
  </Provider>
);
