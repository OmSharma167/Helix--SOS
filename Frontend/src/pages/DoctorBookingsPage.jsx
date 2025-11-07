// src/pages/DoctorBookings.jsx
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  getDoctorBookings,
  updateBookingStatus,
} from "../services/bookingService";

export default function DoctorBookings() {
  const [bookings, setBookings] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMutedAudio, setIsMutedAudio] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(false);
  const socket = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getDoctorBookings(token);
      setBookings(data);
    } catch (err) {
      console.error("Error fetching doctor bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await updateBookingStatus(id, status, token);
      // ✅ Refetch fresh bookings after update
      await fetchBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const handleCommunicationOption = async (option, booking) => {
    setSelectedBooking(booking);
    if (option === "Message") {
      // Open chat modal for real-time messaging
      setMessages([]);
      setNewMessage("");
      setShowChat(true);

      // Initialize socket connection if not already connected
      if (!socket.current) {
        socket.current = io("http://localhost:5000"); // Replace with your backend URL
      }
    } else if (option === "Video Call") {
      // Initialize socket if needed
      if (!socket.current) {
        socket.current = io("http://localhost:5000");
      }
      // Reset mute states
      setIsMutedAudio(false);
      setIsMutedVideo(false);
      // Start video call
      await startVideoCall();
      setShowVideoCall(true);
    } else {
      // TODO: Implement Phone Call
      console.log(
        `Selected communication option: ${option} for booking ${booking?._id}`
      );
    }
  };

  // WebRTC Configuration
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Public STUN server
  };

  const startVideoCall = async () => {
    try {
      // Get local stream
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }

      // Initialize peer connection
      peerConnection.current = new RTCPeerConnection(configuration);

      // Add local stream to peer connection
      localStream.current.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          const room = `video_${selectedBooking._id}`;
          socket.current.emit("ice-candidate", {
            room,
            candidate: event.candidate,
          });
        }
      };

      // Create offer (assuming doctor initiates the call)
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      const room = `video_${selectedBooking._id}`;
      socket.current.emit("offer", { room, offer });

      console.log("Video call initiated");
    } catch (err) {
      console.error("Error starting video call:", err);
    }
  };

  const toggleAudio = () => {
    if (localStream.current && localStream.current.getAudioTracks()[0]) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !isMutedAudio;
      setIsMutedAudio(!isMutedAudio);
    }
  };

  const toggleVideo = () => {
    if (localStream.current && localStream.current.getVideoTracks()[0]) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      videoTrack.enabled = !isMutedVideo;
      setIsMutedVideo(!isMutedVideo);
    }
  };

  // Socket event listeners for video call signaling
  useEffect(() => {
    if (socket.current) {
      const room = `video_${selectedBooking?._id}`;

      socket.current.on("answer", async (data) => {
        if (data.room === room) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );
        }
      });

      socket.current.on("ice-candidate", async (data) => {
        if (data.room === room) {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      });

      return () => {
        socket.current.off("answer");
        socket.current.off("ice-candidate");
      };
    }
  }, [selectedBooking]);

  // Join/leave video room
  useEffect(() => {
    if (showVideoCall && selectedBooking && socket.current) {
      const room = `video_${selectedBooking._id}`;
      socket.current.emit("joinVideoRoom", { room });
    } else if (!showVideoCall && selectedBooking && socket.current) {
      const room = `video_${selectedBooking._id}`;
      socket.current.emit("leaveVideoRoom", { room });
    }
  }, [showVideoCall, selectedBooking]);

  // Join/leave chat room when showChat changes (for messaging)
  useEffect(() => {
    if (showChat && selectedBooking && socket.current) {
      const room = `chat_${selectedBooking._id}`;
      socket.current.emit("joinRoom", { room });
    } else if (!showChat && selectedBooking && socket.current) {
      const room = `chat_${selectedBooking._id}`;
      socket.current.emit("leaveRoom", { room });
    }
  }, [showChat, selectedBooking]);

  // Socket event listeners for real-time chat
  useEffect(() => {
    if (showChat && socket.current) {
      const room = `chat_${selectedBooking?._id}`;

      socket.current.on("message", (msg) => {
        if (msg.room === room) {
          setMessages((prev) => [...prev, msg]);
        }
      });

      socket.current.on("connect", () => {
        console.log("Connected to chat server");
      });

      return () => {
        socket.current.off("message");
        socket.current.off("connect");
      };
    }
  }, [showChat, selectedBooking]);

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      // Cleanup streams and peer connection
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && socket.current && selectedBooking) {
      const room = `chat_${selectedBooking._id}`;
      const msg = {
        room,
        text: newMessage,
        sender: "doctor", // Assuming current user is doctor; adjust based on auth
        timestamp: new Date().toISOString(),
      };
      socket.current.emit("sendMessage", msg);
      setNewMessage("");
    }
  };

  const closeChat = () => {
    if (socket.current && selectedBooking) {
      const room = `chat_${selectedBooking._id}`;
      socket.current.emit("leaveRoom", { room });
    }
    setShowChat(false);
  };

  const endVideoCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setShowVideoCall(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        My Patient Bookings
      </h2>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="font-semibold">{b.userId?.name}</h3>
            <p>Email: {b.userId?.email}</p>
            <p>Date: {new Date(b.appointmentDate).toLocaleString()}</p>
            <p>Reason: {b.reason}</p>
            <p>
              Status: <span className="font-bold">{b.status}</span>
            </p>

            {b.status === "Pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleStatusChange(b._id, "Confirmed")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(b._id, "Cancelled")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            )}

            {b.status === "Confirmed" && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={() => handleCommunicationOption("Message", b)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Talk with Message
                </button>
                <button
                  onClick={() => handleCommunicationOption("Video Call", b)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Talk with Video Calling
                </button>
                <button
                  onClick={() => handleCommunicationOption("Phone Call", b)}
                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                >
                  Talk with Phone Call
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Real-time Chat Modal */}
      {showChat && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md h-96 flex flex-col mx-4 rounded-lg overflow-hidden">
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <h3 className="font-semibold">
                Chat with {selectedBooking.userId?.name}
              </h3>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    msg.sender === "doctor"
                      ? "bg-indigo-100 ml-4"
                      : "bg-white mr-4"
                  } max-w-xs`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Call Modal */}
      {showVideoCall && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl h-[700px] flex flex-col mx-4 rounded-lg overflow-hidden">
            <div className="p-4 bg-green-600 text-white flex justify-between items-center">
              <h3 className="font-semibold">
                Video Call with {selectedBooking.userId?.name}
              </h3>
              <button
                onClick={endVideoCall}
                className="text-white hover:text-gray-200"
              >
                ✕ End Call
              </button>
            </div>
            <div className="flex-1 flex p-4 gap-4">
              {/* Remote Video */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-3/4 rounded-lg bg-black"
                muted
              />
              {/* Local Video (small preview) */}
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                className="w-1/4 rounded-lg bg-black self-end"
                muted
              />
            </div>
            {/* Call Controls */}
            <div className="p-4 flex justify-center gap-4 bg-gray-100">
              <button
                onClick={toggleAudio}
                className={`px-4 py-2 rounded-lg text-white ${
                  isMutedAudio
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isMutedAudio ? "Unmute Mic" : "Mute Mic"}
              </button>
              <button
                onClick={toggleVideo}
                className={`px-4 py-2 rounded-lg text-white ${
                  isMutedVideo
                    ? "bg-gray-500 hover:bg-gray-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {isMutedVideo ? "Unmute Video" : "Mute Video"}
              </button>
              <button
                onClick={endVideoCall}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
