import React from "react";
import fire from "../config/fire-conf";

function SignIn(props) {
  const { signInStatus, setSignInStatus, setUserData } = props;

  const signIn = () => {
    let googleProvider = new fire.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        setSignInStatus(true);
        setUserData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOut = () => {
    setSignInStatus(false);
    fire
      .auth()
      .signOut()
      .then((res) => {
        console.log("Signed Out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (signInStatus === false) {
    return <button onClick={signIn}>Sign In with Google</button>;
  } else {
    return <button onClick={signOut}>Sign Out</button>;
  }
}

export default SignIn;
