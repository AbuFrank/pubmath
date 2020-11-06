import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  function likePost() {
    console.log("Like Post!!");
  }

  function commentPost() {
    console.log("Comment on Post!!");
  }

  return (
    <div className="card mb-10 fluid">
      <div className="content">
        <img
          className="right floated mini ui image"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <div className="header">{username}</div>
        <div className="meta" as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </div>
        <div className="description">{body}</div>
        <div>
          <div onClick={likePost} className="ui labeled button">
            <div className="ui teal basic button">
              <i className="heart icon"></i>
            </div>
            <a className="ui basic teal left pointing label">{likeCount}</a>
          </div>
        </div>
        <div>
          <div onClick={commentPost} className="ui labeled button">
            <div className="ui blue basic button">
              <i className="heart icon"></i>
            </div>
            <a className="ui basic blue left pointing label">{commentCount}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
