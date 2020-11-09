import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const { getPosts: posts } = data ? data : [];

  return (
    <div className="ui three column divided grid">
      <h1 className="text-center">Recent Posts</h1>
      <div className="row">
        {user && (
          <div key={user.id} className="column">
            <PostForm />
          </div>
        )}
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
    </div>
  );
}

export default Home;
