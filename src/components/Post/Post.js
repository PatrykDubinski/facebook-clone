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
  const [showComments, setShowComments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);

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
  }, [chosenEmoji, input]);

  useEffect(() => {
    if (showComments) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((com) => {
              return {
                id: com.id,
                name: com.data().name,
                commentLikes: com.data().commentLikes,
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
  }, [showComments, id]);

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
          <img src={image} alt="Users post" />
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
      {showComments ? (
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
                {showEmojiPicker ? (
                  <Picker onEmojiClick={onEmojiClick} />
                ) : null}
                <button type="submit"></button>
              </form>
            </div>
          </div>
          <div className="comments__bottom">
            {comments.map((com, i) => {
              console.log(com);
              return (
                <Comment
                  id={id}
                  key={i}
                  comment={com.comment}
                  name={com.name}
                  comId={com.id}
                  likes={com.commentLikes}
                  date={com.timestamp}
                  isLiked={com.isLiked}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
