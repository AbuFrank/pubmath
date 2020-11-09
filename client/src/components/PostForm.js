import React from "react";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallBack, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallBack() {
    return createPost();
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={onSubmit} noValidate className="ui form">
        <h1 className="text-center">Create a post:</h1>
        <div className="field">
          <label>Post Body</label>
          <input
            value={values.body}
            type="text"
            name="body"
            placeholder="Hi World!"
            onChange={onChange}
            // error={errors.body ? "true" : "false"}
          />
        </div>
        {/* <div className="field">
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
        </div> */}
        <button className="ui button teal" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
