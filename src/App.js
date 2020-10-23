import React from "react";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Login from "./components/Login/Login";
import { useStateValue } from "./components/store/StateProvider";
import MessengerChat from "./components/Messenger/MessengerChat/MessengerChat";

function App() {
  const [{ user, chat }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
          </div>
          {chat ? <MessengerChat /> : null}
        </>
      )}
    </div>
  );
}

export default App;
