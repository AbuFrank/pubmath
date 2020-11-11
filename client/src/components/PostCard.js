import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="ui card mb-10 fluid">
      <div className="content">
        <img
          className="right floated mini ui image"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <div className="header">{username}</div>
        <Link className="meta" to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Link>
        <div className="description">{body}</div>
        <div>
          <LikeButton post={{ id, likes, likeCount }} user={user} />
          <Link to={`/post/${id}`} className="ui labeled button right">
            <div className="ui blue basic button">
              <i className="comments icon"></i>
            </div>
            <span className="ui basic blue left pointing label">
              {commentCount}
            </span>
          </Link>
        </div>
        {user && user.username === username && (
          <div onClick={() => console.log("delete post!!!")}>
            <i
              aria-hidden="true"
              className="float-right icon red right trash"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
