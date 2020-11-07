import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import clsx from "clsx";

import { AuthContext } from "../context/auth";

import { useForm } from "../util/hooks";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="container mx-auto">
      <form
        onSubmit={onSubmit}
        noValidate
        className={clsx("ui form", loading ? "loading" : "")}
      >
        <h1 className="text-center">Register</h1>
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
          <label>Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
            error={errors.email ? "true" : "false"}
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
        <div className="field">
          <label>Confirm Password</label>
          <input
            value={values.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={onChange}
            error={errors.confirmPassword ? "true" : "false"}
          />
        </div>
        <button className="ui button" type="submit">
          Submit
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
