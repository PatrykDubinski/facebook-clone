import { Avatar } from "@material-ui/core";
import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import "./Comment.css";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import db from "../../../firebase";
import firebase from "firebase";

const Comment = ({ id, name, comment, isLiked, timestamp }) => {
  const [input, setInput] = useState("");
  const [isLikedComment, setIsLikedComment] = useState(false);

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

  const likeComment = (e) => {
    const comId = e.target.closest(".comments__bottom-comment").id;
    if (!isLikedComment) {
      setIsLikedComment(true);
      let likes;
      db.collection("posts").doc(id).collection("comments").doc(comId).update({
        commentLikes: likes,
        isLiked: true,
      });
    } else {
      setIsLikedComment(false);
      let likes;
      db.collection("posts").doc(id).collection("comments").doc(comId).update({
        commentLikes: likes,
        isLiked: false,
      });
    }
  };

  return (
    <div id={id} className="comments__bottom-comment">
      <div className="comments__bottom-commentLeft">
        <Avatar />
      </div>
      <div className="comments__bottom-commentRight">
        <div className="comment__content">
          <h4>{name}</h4>
          <p>{comment}</p>
          <span className="smallStats">
            <ThumbUpIcon />
          </span>
        </div>
        <div className="comments__stats">
          <p
            className={isLiked ? "comment__liked" : null}
            onClick={(e) => likeComment(e)}
          >
            Like
          </p>
          <p>&middot;</p>
          <p>{timestamp} days ago</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
