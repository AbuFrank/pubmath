import gql from "graphql-tag";
import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";
import { Link } from "react-router-dom";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const { getPost } = data ? data : {};

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;
    postMarkup = (
      <div className="ui stackable two column grid">
        <div className="two wide column">
          <div className="ui segment">
            <img
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
              className="ui image"
            />
          </div>
        </div>
        <div className="ten wide column">
          <div className="ui segment">
            <div className="ui card fluid">
              <div className="content">
                <div className="header">{username}</div>
                <div className="header">{moment(createdAt).fromNow(true)}</div>
                <div className="description">{body}</div>
              </div>
              <div className="content">
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Add comment to post">
                  <div
                    role="button"
                    onClick={() => commentInputRef.current.focus()}
                    className="ui labeled button right"
                  >
                    <div className="ui blue basic button">
                      <i className="comments icon"></i>
                    </div>
                    <div className="ui basic blue left pointing label">
                      {commentCount}
                    </div>
                  </div>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </div>
            </div>
            {user && (
              <div>
                <div>
                  <form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {comments.map((comment) => (
              <div key={comment.id} className="ui card fluid">
                <div className="content">
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <div className="header">{comment.username}</div>
                  <div className="header">
                    {moment(comment.createdAt).fromNow(true)}
                  </div>
                  <div className="description">{comment.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
