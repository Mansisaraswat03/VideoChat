import React, { useState, useCallback,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSocket} from "../context/SocketProvider";
const Home = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const socket =useSocket();
//   console.log(socket);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join",{email,room});
    },
    [email, room,socket]
  );

  const handleJoinRoom= useCallback((data)=>{
    const{email,room}=data;
    navigate(`/room/${room}`);
  },[navigate]);

  useEffect(()=>{
    socket.on("room:join",handleJoinRoom);
    return()=>{
        socket.off("room:join",handleJoinRoom);
    }
  },[socket,handleJoinRoom]);

  return (
    <div>
    <h1>Mansi's VideoChat</h1>
        <form onSubmit={handleSubmitForm}>
          <label htmlfor="email">Email_id: </label>
          <input
            type="email"
            placeholder="Enter your email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <label htmlfor="room">Room_id: </label>
          <input
            type="text"
            placeholder="Enter room code"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          /><br/>
          <button>Enter Room</button>
        </form>
    </div>
  );
};

export default Home;
