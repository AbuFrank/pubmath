import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import clsx from "clsx";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="container mx-auto">
      <form
        onSubmit={onSubmit}
        noValidate
        className={clsx("ui form", loading ? "loading" : "")}
      >
        <h1 className="text-center">Login</h1>
        <div className="field">
          <label>Username</label>
          <input
            value={values.username}
            type="text"
            name="username"
            placeholder="Username"
            onChange={onChange}
            error={errors.username ? "true" : "false"}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            error={errors.password ? "true" : "false"}
          />
        </div>
        <button className="ui button" type="submit">
          Login
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
