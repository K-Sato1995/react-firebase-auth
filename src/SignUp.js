import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { app, db } from "./base";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, role } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(cred => {
            /// Creating the user with custom information in firestore.
            console.log(cred);
            db.collection("users")
              .doc(cred.user.uid)
              .set({
                role: role.value
              });
          });
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <label>
          Role
          <input name="role" type="text" placeholder="Role" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
