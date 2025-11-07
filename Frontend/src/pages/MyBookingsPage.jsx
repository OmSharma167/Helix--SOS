


// src/pages/MyBookingsPage.jsx
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getMyBookings } from "../services/bookingService";
import { useAuth } from "../context/AuthContext";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showAudioCall, setShowAudioCall] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [incomingCallData, setIncomingCallData] = useState({ offer: null, callType: null });
  const [isMutedAudio, setIsMutedAudio] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(false);
  const [callConnected, setCallConnected] = useState(false);

  const socket = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings(user.token);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  // Initialize Socket.io
  useEffect(() => {
    if (!socket.current && user) {
      socket.current = io("http://localhost:5000", {
        auth: { token: user.token },
      });
    }

    // Listen for incoming calls
    socket.current?.on("offer", (data) => {
      const { offer, callType, bookingId } = data;
      const booking = bookings.find((b) => b._id === bookingId);
      if (booking && booking.status === "Confirmed") {
        setIncomingCallData({ offer, callType, bookingId });
        setSelectedBooking(booking);
        setShowIncomingCall(true);
      }
    });

    return () => {
      socket.current?.off("offer");
    };
  }, [bookings, user]);

  // Handle ICE candidates
  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("ice-candidate", async (data) => {
      if (peerConnection.current && data.room.includes(selectedBooking?._id)) {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {
          console.error("Error adding ICE candidate", e);
        }
      }
    });

    return () => socket.current?.off("ice-candidate");
  }, [selectedBooking]);

  // Start Call (Patient initiates)
  const startCall = async (callType, booking) => {
    setSelectedBooking(booking);
    setCallConnected(false);
    setIsMutedAudio(false);
    setIsMutedVideo(false);

    try {
      const constraints = callType === "video"
        ? { video: true, audio: true }
        : { video: false, audio: true };

      localStream.current = await navigator.mediaDevices.getUserMedia(constraints);

      if (callType === "video") {
        localVideoRef.current.srcObject = localStream.current;
      } else {
        localAudioRef.current.srcObject = localStream.current;
      }

      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      peerConnection.current.ontrack = (event) => {
        const remoteStream = event.streams[0];
        if (callType === "video") {
          remoteVideoRef.current.srcObject = remoteStream;
        } else {
          remoteAudioRef.current.srcObject = remoteStream;
        }
        setCallConnected(true);
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          const room = `${callType}_${booking._id}`;
          socket.current.emit("ice-candidate", { room, candidate: event.candidate, callType });
        }
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      const room = `${callType}_${booking._id}`;
      socket.current.emit("offer", {
        room,
        offer,
        callType,
        bookingId: booking._id,
      });

      if (callType === "video") setShowVideoCall(true);
      else setShowAudioCall(true);
    } catch (err) {
      console.error("Failed to start call:", err);
      alert("Camera/Microphone access denied or not available.");
    }
  };

  // Accept Incoming Call
  const acceptCall = async () => {
    const { offer, callType, bookingId } = incomingCallData;
    const booking = bookings.find((b) => b._id === bookingId);
    setSelectedBooking(booking);
    setShowIncomingCall(false);
    setCallConnected(false);

    try {
      const constraints = callType === "video"
        ? { video: true, audio: true }
        : { video: false, audio: true };

      localStream.current = await navigator.mediaDevices.getUserMedia(constraints);

      if (callType === "video") {
        localVideoRef.current.srcObject = localStream.current;
      } else {
        localAudioRef.current.srcObject = localStream.current;
      }

      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      peerConnection.current.ontrack = (event) => {
        const remoteStream = event.streams[0];
        if (callType === "video") {
          remoteVideoRef.current.srcObject = remoteStream;
        } else {
          remoteAudioRef.current.srcObject = remoteStream;
        }
        setCallConnected(true);
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          const room = `${callType}_${bookingId}`;
          socket.current.emit("ice-candidate", { room, candidate: event.candidate, callType });
        }
      };

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      const room = `${callType}_${bookingId}`;
      socket.current.emit("answer", { room, answer, callType });

      if (callType === "video") setShowVideoCall(true);
      else setShowAudioCall(true);
    } catch (err) {
      console.error("Failed to accept call:", err);
    }
  };

  const rejectCall = () => {
    const { callType, bookingId } = incomingCallData;
    socket.current.emit("call-rejected", { room: `${callType}_${bookingId}`, callType });
    setShowIncomingCall(false);
    setIncomingCallData({ offer: null, callType: null });
  };

  // Toggle Mute
  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMutedAudio(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsMutedVideo(!videoTrack.enabled);
      }
    }
  };

  // End Call
  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    localAudioRef.current.srcObject = null;
    remoteAudioRef.current.srcObject = null;
    setShowVideoCall(false);
    setShowAudioCall(false);
    setCallConnected(false);
  };

  // Chat Functions
  const openChat = (booking) => {
    setSelectedBooking(booking);
    setMessages([]);
    setShowChat(true);
    const room = `chat_${booking._id}`;
    socket.current.emit("joinRoom", { room });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedBooking) return;
    const msg = {
      room: `chat_${selectedBooking._id}`,
      text: newMessage,
      sender: "patient",
      timestamp: new Date().toISOString(),
    };
    socket.current.emit("sendMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  useEffect(() => {
    if (showChat && socket.current) {
      socket.current.on("message", (msg) => {
        if (msg.room === `chat_${selectedBooking?._id}`) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    }
    return () => socket.current?.off("message");
  }, [showChat, selectedBooking]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">My Appointments</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-xl p-6 shadow-lg bg-white hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-indigo-600">D</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{b.doctorId?.name}</h3>
                  <p className="text-sm text-gray-600">{b.doctorId?.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong>Date:</strong> {new Date(b.appointmentDate).toLocaleString()}</p>
                <p><strong>Reason:</strong> {b.reason}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    b.status === "Confirmed" ? "bg-green-500" :
                    b.status === "Cancelled" ? "bg-red-500" : "bg-yellow-500"
                  }`}>
                    {b.status}
                  </span>
                </p>
              </div>

              {b.status === "Confirmed" && (
                <div className="mt-6 flex gap-2 flex-wrap">
                  <button
                    onClick={() => openChat(b)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => startCall("video", b)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Video Call
                  </button>
                  <button
                    onClick={() => startCall("audio", b)}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm font-medium"
                  >
                    Audio Call
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Incoming Call Modal */}
      {showIncomingCall && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              incomingCallData.callType === "video" ? "bg-green-500" : "bg-purple-500"
            }`}>
              {incomingCallData.callType === "video" ? (
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">Incoming {incomingCallData.callType === "video" ? "Video" : "Audio"} Call</h2>
            <p className="text-gray-600 mb-8">Dr. {selectedBooking.doctorId?.name}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={rejectCall} className="px-8 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 text-lg font-medium">
                Reject
              </button>
              <button onClick={acceptCall} className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-lg font-medium">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Call */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 w-full max-w-4xl h-screen flex flex-col">
            <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Video Call with Dr. {selectedBooking?.doctorId?.name}
                {callConnected && " - Connected"}
              </h3>
              <button onClick={endCall} className="text-2xl">X</button>
            </div>

            <div className="flex-1 relative">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <video ref={localVideoRef} autoPlay playsInline className="absolute bottom-4 right-4 w-64 h-48 rounded-lg border-4 border-white shadow-2xl" />
            </div>

            <div className="p-6 bg-gray-800 flex justify-center gap-6">
              <button onClick={toggleAudio} className={`p-4 rounded-full ${isMutedAudio ? "bg-red-600" : "bg-gray-600"} hover:scale-110 transition`}>
                {isMutedAudio ? "Microphone Off" : "Microphone On"}
              </button>
              <button onClick={toggleVideo} className={`p-4 rounded-full ${isMutedVideo ? "bg-red-600" : "bg-gray-600"} hover:scale-110 transition`}>
                {isMutedVideo ? "Camera Off" : "Camera On"}
              </button>
              <button onClick={endCall} className="p-6 bg-red-600 rounded-full hover:bg-red-700 transition">
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Call */}
      {showAudioCall && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 w-full max-w-md h-screen flex flex-col items-center justify-center text-white">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mb-8 animate-pulse" />
            <h2 className="text-3xl font-bold mb-2">Dr. {selectedBooking?.doctorId?.name}</h2>
            <p className="text-xl mb-12">{callConnected ? "Connected" : "Ringing..."}</p>

            <audio ref={localAudioRef} autoPlay muted />
            <audio ref={remoteAudioRef} autoPlay />

            <div className="flex gap-8">
              <button onClick={toggleAudio} className={`p-6 rounded-full ${isMutedAudio ? "bg-red-600" : "bg-white bg-opacity-30"}`}>
                {isMutedAudio ? "Microphone Off" : "Microphone On"}
              </button>
              <button onClick={endCall} className="p-8 bg-red-600 rounded-full hover:bg-red-700">
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg h-96 mx-4 rounded-2xl shadow-2xl flex flex-col">
            <div className="p-4 bg-indigo-600 text-white rounded-t-2xl flex justify-between items-center">
              <h3>Chat with Dr. {selectedBooking.doctorId?.name}</h3>
              <button onClick={() => setShowChat(false)} className="text-2xl">X</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`mb-3 flex ${m.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.sender === "patient" ? "bg-indigo-600 text-white" : "bg-gray-300"}`}>
                    <p>{m.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button onClick={sendMessage} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

