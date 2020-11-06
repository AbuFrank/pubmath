import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);

  const { getPosts: posts } = data ? data : [];

  return (
    <div className="ui three column divided grid">
      <h1 className="text-center">Recent Posts</h1>
      <div className="row">
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <div key={post.id} className="column">
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
      <div className="row">
        <div className="column">
          <p></p>
        </div>
        <div className="column">
          <p></p>
        </div>
        <div className="column">
          <p></p>
        </div>
      </div>
    </div>
  );
}

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
