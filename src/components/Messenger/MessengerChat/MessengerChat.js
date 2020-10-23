import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import "./MessengerChat.css";
import firebase from "firebase";

import VideocamIcon from "@material-ui/icons/Videocam";
import PhoneIcon from "@material-ui/icons/Phone";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../store/StateProvider";
import { actionTypes } from "../../store/reducer";
import db from "../../../firebase";

const MessengerChat = React.memo(() => {
  const [{ roomId, user }, dispatch] = useStateValue();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    if (chosenEmoji) {
      setInput(input + chosenEmoji.emoji);
    }
  }, [chosenEmoji, input]);

  useEffect(() => {
    const messageWindow = document.querySelector(".messengerChat__messages");
    messageWindow.scrollTop = messageWindow.scrollHeight;
  }, [messages]);

  const minimizeHandler = () => {
    const messengerChat = document.querySelector(".messengerChat");
    messengerChat.style.transform = "translateY(50px)";
    messengerChat.style.height = "100px";
    messengerChat.addEventListener("click", maximizeChat);
  };

  const maximizeChat = () => {
    const messengerChat = document.querySelector(".messengerChat");
    messengerChat.style.transform = "translateY(0)";
    messengerChat.style.height = "400px";
  };

  const closeChatHandler = () => {
    dispatch({
      type: actionTypes.CLOSE_CHAT,
      chat: false,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = input;

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: "test",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    db.collection("rooms").doc(roomId).update({
      lastMessage: message,
      lastMessageDate: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="messengerChat">
      <div className="messengerChat__top">
        <div className="messengerChat__top-left">
          <Avatar />
          <h3>{roomName}</h3>
        </div>
        <div className="messengerChat__top-right">
          <VideocamIcon />
          <PhoneIcon />
          <RemoveIcon onClick={minimizeHandler} />
          <CloseIcon onClick={closeChatHandler} />
        </div>
      </div>
      <div className="messengerChat__messages">
        {messages.map((message, i) => {
          return (
            <p
              key={i}
              className={`messengerChat__messages-message ${
                message.name !== user.displayName && "chat__reciever"
              }`}
            >
              {message.message}
            </p>
          );
        })}
      </div>
      <div className="messengerChat__bottom">
        <div className="messengerChat__bottom-inputWrapper">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Aa"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit"></button>
          </form>
          <EmojiEmotionsIcon
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
        </div>
      </div>
    </div>
  );
});

export default MessengerChat;
