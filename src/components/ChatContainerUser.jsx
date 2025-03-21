import { useEffect, useRef } from "react";
import { userChatStore } from "../store/userChatStore";
import { userAuthStore } from "../store/userAuthStore";
import ChatHeaderUser from "./ChatHeaderUser";
import MessageInputUser from "./MessageInputUser";
import MessageSkeletonUser from "./skeletons/MessageSkeletonUser";
import { formatMessageTime } from "../lib/utils";

const ChatContainerUser = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, joinRoom } =
    userChatStore();
  const { authUser } = userAuthStore();
  const chatContainerRef = useRef(null); // Ref for the scrollable container
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!authUser) return;

    const setupChat = async () => {
      if (selectedUser?.id) {
        await joinRoom(selectedUser.id); // Ensure room is joined on mount
      }
      cleanupRef.current = () => {};
    };
    setupChat();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [authUser, joinRoom, selectedUser]);

  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
    }
  }, [selectedUser?.id, getMessages]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeaderUser />
        <MessageSkeletonUser />
        <MessageInputUser />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeaderUser />
        <div className="flex-1 p-4 text-center">
          Select a driver to start chatting
        </div>
        <MessageInputUser />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeaderUser />
      <div
        ref={chatContainerRef} // Attach ref to scrollable container
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => {
          const isSentByUser =
            message.senderUserId === authUser.id && !message.senderDriverId;
          const senderProfileImage = isSentByUser
            ? authUser.profileImage || "/avatar.png"
            : selectedUser.profileImageUrl || "/avatar.png";

          return (
            <div
              key={message.id}
              className={`chat ${isSentByUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="h-10 w-10 rounded-full border">
                  <img src={senderProfileImage} alt="profile pic" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInputUser />
    </div>
  );
};

export default ChatContainerUser;
