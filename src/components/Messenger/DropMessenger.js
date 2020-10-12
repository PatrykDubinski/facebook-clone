import React, { useEffect, useState } from "react";
import "./DropMessenger.css";

import db from "../../firebase";
import SearchIcon from "@material-ui/icons/Search";
import MessengerMessage from "./MessengerMessage/MessengerMessage";
import Loading from "../UI/Loading/Loading";

const DropMessenger = React.memo(() => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .orderBy("lastMessageDate", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
  }, []);

  return (
    <div className="dropMessenger">
      <div className="dropMessenger__top">
        <h2>Messenger</h2>
        <div className="dropMessenger__top--input-wrapper">
          <SearchIcon />
          {/* Search chat function */}
          <input type="text" placeholder="Search in Messenger" />
        </div>
      </div>
      <div className="dropMessenger__messages">
        {messages.length < 1 ? (
          <Loading />
        ) : (
          messages.map((msg) => {
            return (
              <MessengerMessage
                key={msg.id}
                id={msg.id}
                name={msg.data.name}
                message={msg.data.lastMessage}
              />
            );
          })
        )}
      </div>
      <div className="dropMessenger__bottom">
        <h4>Show more in Messenger</h4>
      </div>
    </div>
  );
});

export default DropMessenger;
