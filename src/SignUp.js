import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { app } from "./base";
import { useMutation } from "@apollo/react-hooks";
import CREATE_USER from "./mutations/createUser";

const SignUp = ({ history }) => {
  const [createUser] = useMutation(CREATE_USER);
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, role } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(cred => {
            /// Creating the user in Rails DB
            createUser({
              variables: {
                uid: cred.user.uid,
                name: email.value,
                role: role.value
              }
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
          <input name="role" type="number" placeholder="Role" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
