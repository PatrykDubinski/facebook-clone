import React from "react";
import "./MessengerMessage.css";

import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../store/StateProvider";
import { actionTypes } from "../../store/reducer";

const MessengerMessage = ({ name, message, id }) => {
  const [state, dispatch] = useStateValue();

  const showChat = () => {
    dispatch({
      type: actionTypes.OPEN_CHAT,
      chat: true,
      roomId: id,
    });
  };

  return (
    <div className="messengerMessage" onClick={() => showChat()}>
      <Avatar />
      <div className="messengerMessage__info">
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessengerMessage;
