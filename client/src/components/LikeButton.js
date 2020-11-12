import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MyPopup from "../util/MyPopup";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <div className="ui teal button">
        <i aria-hidden="true" className="icon heart"></i>
      </div>
    ) : (
      <div className="ui basic teal button">
        <i aria-hidden="true" className="icon heart"></i>
      </div>
    )
  ) : (
    <Link to="/login" className="ui basic teal button">
      <i aria-hidden="true" className="icon heart"></i>
    </Link>
  );

  return (
    <div onClick={likePost} className="ui labeled button left">
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
      <button className="ui basic teal left pointing label">{likeCount}</button>
    </div>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
