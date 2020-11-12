import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { Transition } from "semantic-ui-react";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const { getPosts: posts } = data ? data : [];
  console.log("Posts: ", posts);
  return (
    <div className="ui three column divided grid">
      <h1 className="text-center">Recent Posts</h1>
      <div className="row">
        {user && (
          <div key={user.id} className="column">
            <PostForm />
          </div>
        )}
      </div>
      <div className="row">
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <div key={post.id} className="ui transition zoom column">
                  <PostCard post={post} />
                </div>
              ))}
          </Transition.Group>
        )}
      </div>
    </div>
  );
}

export default Home;
