import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { Popup } from "semantic-ui-react";
import MyPopup from "../util/MyPopup";

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
          <MyPopup content="Add comment to post">
            <Link to={`/posts/${id}`} className="ui labeled button right">
              <div className="ui blue basic button">
                <i className="comments icon"></i>
              </div>
              <span className="ui basic blue left pointing label">
                {commentCount}
              </span>
            </Link>
          </MyPopup>
        </div>
        {user && user.username === username && <DeleteButton postId={id} />}
      </div>
    </div>
  );
}

export default PostCard;
