import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import Picker from "emoji-picker-react";
import firebase from "firebase";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import db from "../../firebase";
import Comment from "./Comment/Comment";

const Post = ({ profilePic, image, username, timestamp, message, id }) => {
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedComment, setIsLikedComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLikes, setCommentLikes] = useState(null);

  useEffect(() => {
    if (id) {
      db.collection("posts")
        .doc(id)
        .onSnapshot((snapshot) => setLikes(snapshot.data().likes));
    }
  }, [id, likes]);

  useEffect(() => {
    if (chosenEmoji) {
      setInput(input + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);

  useEffect(() => {
    if (showComments) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((com) => {
              console.log(com.data().timestamp);
              return {
                id: com.id,
                name: com.data().name,
                commentLikes: com.data().likes,
                comment: com.data().comment,
                isLiked: com.data().isLiked,
                timestamp: new Date(
                  com.data().timestamp?.toDate()
                ).toUTCString(),
              };
            })
          );
        });
    }
  }, [showComments]);

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((snapshot) =>
        setCommentLikes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            likes: doc.data().commentLikes,
          }))
        )
      );
  }, [id]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const submitComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      comment: input,
      commentLikes: 0,
      isLiked: false,
      name: "tempName line 96",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const likePost = () => {
    if (!isLiked) {
      db.collection("posts")
        .doc(id)
        .update({
          likes: likes + 1,
        });
      setIsLiked(true);
    } else {
      db.collection("posts")
        .doc(id)
        .update({
          likes: likes - 1,
        });
      setIsLiked(false);
    }
  };

  const likeComment = (e) => {
    const comId = e.target.closest(".comments__bottom-comment").id;
    if (!isLikedComment) {
      setIsLikedComment(true);
      let likes;
      commentLikes.map((com) => {
        if (com.id === comId) {
          likes = com.likes + 1;
        }
      });
      db.collection("posts").doc(id).collection("comments").doc(comId).update({
        commentLikes: likes,
        isLiked: true,
      });
    } else {
      setIsLikedComment(false);
      let likes;
      commentLikes.map((com) => {
        if (com.id === comId) {
          likes = com.likes - 1;
        }
      });
      db.collection("posts").doc(id).collection("comments").doc(comId).update({
        commentLikes: likes,
        isLiked: false,
      });
    }
  };

  const toggleComments = (e) => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post__top">
        <Avatar className="post__avatar" src={profilePic} />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      {image ? (
        <div className="post__image">
          <img src={image} alt="Users Photo" />
        </div>
      ) : null}
      <div
        className="social__stats"
        style={{ height: likes === 0 ? "0px" : null }}
      >
        {likes > 0 ? (
          <span className="social__stats-likes">{likes}</span>
        ) : null}
      </div>
      <div
        className={`post__options ${showComments ? "comment__border" : null}`}
      >
        <div className="post__option" onClick={likePost}>
          <ThumbUpIcon className={isLiked ? "likedIcon" : null} />
          {isLiked ? <p className="likedText">You liked!</p> : <p>Like!</p>}
        </div>
        <div
          onClick={(e) => {
            toggleComments(e);
          }}
          className="post__option"
        >
          <ChatBubbleOutlinedIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreOutlinedIcon />
        </div>
      </div>
      {/* Komentarze */}
      <div className="post__comments">
        <div className="comments__top">
          <Avatar />
          <div className="comments__top-input">
            <form onSubmit={submitComment}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Write your comment..."
              />
              <EmojiEmotionsIcon
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
              <button type="submit"></button>
            </form>
          </div>
        </div>
        <div className="comments__bottom">
          {showComments
            ? comments.map((com) => {
                console.log(com);
                return (
                  <Comment
                    id={id}
                    comment={com.comment}
                    name={com.name}
                    comId={com.id}
                    likes={com.commentLikes}
                    date={com.timestamp}
                    isLiked={com.isLiked}
                  />
                );
              })
            : null}
          {/* {comments.map((com, i) => {
              console.log(com);
              let likes = commentLikes.map((like) => {
                if (like.id === com.id) {
                  return like.likes;
                }
              });
              const daysAgo = Math.ceil(
                (new Date().getTime() - new Date(com.timestamp).getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <div key={i} id={com.id} className="comments__bottom-comment">
                  <div className="comments__bottom-commentLeft">
                    <Avatar />
                  </div>
                  <div className="comments__bottom-commentRight">
                    <div className="comment__content">
                      <h4>{com.name}</h4>
                      <p>{com.comment}</p>
                      <span className="smallStats">
                        <ThumbUpIcon />
                        {likes}
                      </span>
                    </div>
                    <div className="comments__stats">
                      <p
                        className={com.isLiked ? "comment__liked" : null}
                        onClick={(e) => likeComment(e)}
                      >
                        Like
                      </p>
                      <p>&middot;</p>
                      <p>{daysAgo} days ago</p>
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default Post;
