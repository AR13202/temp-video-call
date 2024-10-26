import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [myStream, setMyStream] = useState();
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback((roomNumber) => {
      // e.preventDefault();l
      console.log("object",{ email, roomNumber })
      socket.emit("room:join", { email, roomNumber,myStream });
      navigate(`/room/${roomNumber}`);
    },
    [email,navigate, socket, myStream]
  );
  const createRoom = useCallback((email)=>{
    // e.preventDefault();
    if(email){
      const date = new Date();
      const roomNumber = date.getTime().toString();
      console.log("first1",roomNumber);
      setRoom(roomNumber);
      console.log("first",room)
      handleSubmitForm(roomNumber);
    }
  },[handleSubmitForm,room]);

  useEffect(()=>{
    console.log("room",room);
  },[room]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      // navigate(`/room/${room}`);
    },
    []
  );
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    // const offer = await peer.getOffer();
    // socket.emit("user:call", { to: remoteSocketId, offer });
  }, []);

  useEffect(()=>{
    handleCallUser();
  },[handleCallUser])

  const handleUserJoined = useCallback(()=>{

  },[]);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("room:join", handleJoinRoom);
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="flex w-full h-[100dvh] gap-2">
      <div className="flex gap-3 flex-col w-full h-full justify-center items-center">
      <h1 className="p-4 w-full h-fit text-[2rem]">Video Call</h1>
      <div className="flex h-full justify-center flex-col gap-3">
        <label className="flex gap-3 justify-between" htmlFor="email">Email ID
        <input
          className="border border-black rounded"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </label>
        <button onClick={()=>createRoom(email)} className="bg-blue-400 hover:bg-green-950 py-2 rounded text-white">Create Room</button>
        <div>--------------------OR-------------------</div>
        <div className="">Join Room</div>
        <label className="flex gap-3 justify-between" htmlFor="room">Room Number
        <input
          className="border border-black rounded"
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        </label>
        <button onClick={()=>handleSubmitForm(room)} className="bg-blue-950 hover:bg-red-400 py-2 rounded text-white">Join</button>
      </div>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <ReactPlayer
          playing
          muted
          className={`w-full h-full`}
          url={myStream}
        />
      </div>
    </div>
  );
};

export default LobbyScreen;

// TODO: need to send person stream to backend with email and room number.
// TODO: the Map should contain the array of other user (not only 1 to 1 call).
// TODO: able to leave a call.