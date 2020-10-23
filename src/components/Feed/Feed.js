import React, { useState, useEffect } from "react";
import "./Feed.css";

import StoryRel from "../Story/StoryRel/StoryRel";
import MessageSender from "../Poster/MessageSender";
import Post from "../Post/Post";
import db from "../../firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className="feed">
      <StoryRel />
      <MessageSender />

      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            profilePic={post.data.profilePic}
            message={post.data.message}
            timestamp={post.data.timestamp}
            image={post.data.image}
            username={post.data.username}
          />
        );
      })}
    </div>
  );
};

export default Feed;
