import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { userAuthStore } from "./userAuthStore";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8877";

export const userChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      selectedUser: null,
      isUsersLoading: false,
      isMessagesLoading: false,
      messageCache: new Map(),
      socket: null,
      onlineUsers: [],
      currentRoom: null,

      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const token = localStorage.getItem("userToken");
          if (!token) throw new Error("No user token found. Please log in.");
          const res = await axiosInstance.get("/messages-user/users", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
            },
          });
          set({ users: res.data });
          return res.data;
        } catch (error) {
          const errorMsg =
            error.response?.data?.error || "Failed to load drivers";
          toast.error(errorMsg);
          console.error("Error in getUsers:", error);
          return null;
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getMessages: async (driverId) => {
        const { messageCache, messages } = get();
        if (messageCache.has(driverId) && messages.length > 0) {
          console.log("Using cached messages for driver:", driverId);
          return messages;
        }
        messageCache.delete(driverId);
        set({ messages: [], isMessagesLoading: true });
        try {
          const token = localStorage.getItem("userToken");
          if (!token) throw new Error("No user token found. Please log in.");
          const res = await axiosInstance.get(
            `/messages-user/user/${driverId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Cache-Control": "no-cache",
              },
            }
          );
          console.log("Fetched messages from backend:", res.data);
          set({ messages: res.data });
          messageCache.set(driverId, res.data);
          return res.data;
        } catch (error) {
          const errorMsg =
            error.response?.data?.error || "Failed to load messages";
          toast.error(errorMsg);
          console.error("Error in getMessages:", error);
          return null;
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser, socket, joinRoom, messages, messageCache } =
          get();
        const { authUser } = userAuthStore.getState();

        try {
          const { text, image } = messageData;
          if (!authUser) throw new Error("Please log in to send messages");

          if (!socket || !socket.connected) {
            await joinRoom(selectedUser.id);
            console.log("join room if socket does not connect");
            console.log(socket ?? `socket ${socket.connected}`);
          }

          const bookingId = await getBookingId(selectedUser.id);
          await joinRoom(selectedUser.id);

          // const res = await axiosInstance.post(
          //   `/messages-user/user/send/${selectedUser.id}`,
          //   { text, image, recipientType: "driver" },
          //   {
          //     headers: {
          //       Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          //     },
          //   }
          // );
          // const newMessage = res.data;

          // Optimistically add the message to the store
          // set((state) => {
          //   const updatedMessages = [...state.messages, newMessage];
          //   if (selectedUser)
          //     messageCache.set(selectedUser.id, updatedMessages);
          //   return { messages: updatedMessages };
          // });

          socket.emit("sendMessage", {
            senderId: authUser.id,
            receiverId: selectedUser.id,
            text,
            image,
            recipientType: "driver",
            role: "user",
          });
          return;
          // return newMessage;
        } catch (error) {
          console.error("Error in sendMessage:", error);
          toast.error(error.response?.data?.error || "Failed to send message");
          return null;
        }
      },

      onReceivingMessage: async (messageData) => {
        const { selectedUser, socket, joinRoom, messages, messageCache } =
          get();

        if (!socket || !socket.connected) {
          await joinRoom(selectedUser.id);
          console.log("join room if socket does not connect");
          console.log(socket ?? `socket ${socket.connected}`);
        }

        socket.on((newMessage) => {
          console.log("New message from socket.omit", newMessage)
          set((state) => {
            const updatedMessages = [...state.messages, newMessage];
            if (selectedUser)
              messageCache.set(selectedUser.id, updatedMessages);
            return { messages: updatedMessages };
          });
        });
        return socket;
      },

      setSelectedUser: (selectedUser) => set({ selectedUser }),

      connectSocket: async () => {
        const { authUser } = userAuthStore.getState();
        if (!authUser) {
          console.error("No authenticated user found, cannot connect socket");
          return null;
        }

        let socket = get().socket;
        if (socket?.connected) {
          console.log("User socket already connected:", socket.id);
          return socket;
        }

        if (socket) {
          socket.disconnect();
        }

        socket = io(BASE_URL, {
          query: { userId: authUser.id },
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
        });

        socket.on("connect", async () => {
          console.log("User socket connected:", socket.id);
          set({ socket });
          const { selectedUser } = get();
          if (selectedUser?.id) {
            await get().joinRoom(selectedUser.id);
            await get().getMessages(selectedUser.id);
          }
        });

        socket.on("connect_error", (error) => {
          console.error("User socket connection error:", error.message);
        });

        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });

        socket.on("disconnect", () => {
          console.log("User socket disconnected");
          set({ currentRoom: null });
        });

        socket.on("newMessage", (message) => {
          const { messages, selectedUser, messageCache, currentRoom } = get();
          const authUser = userAuthStore.getState().authUser;
          if (!authUser || !message.id) return;

          console.log("Received newMessage event:", message);
          if (message.bookingId === currentRoom) {
            set((state) => {
              if (state.messages.some((msg) => msg.id === message.id)) {
                console.log("Duplicate message detected, skipping:", message);
                return state;
              }
              const updatedMessages = [...state.messages, message];
              if (selectedUser)
                messageCache.set(selectedUser.id, updatedMessages);
              console.log("Adding new message to state:", message);
              return { messages: updatedMessages };
            });
            console.log(
              `User received and added message in room ${currentRoom}:`,
              message
            );
          } else {
            console.log(
              "Message ignored - wrong room:",
              message.bookingId,
              "vs",
              currentRoom
            );
          }
        });

        set({ socket });
        return socket;
      },

      joinRoom: async (receiverId) => {
        const { authUser } = userAuthStore.getState();
        if (!authUser) {
          console.error("No authenticated user found");
          return null;
        }

        let socket = get().socket;
        if (!socket || !socket.connected) {
          socket = await get().connectSocket();
        }

        if (receiverId) {
          const bookingId = await getBookingId(receiverId);
          const currentRoom = get().currentRoom;

          if (currentRoom !== bookingId) {
            if (currentRoom) {
              socket.emit("leaveChat", currentRoom);
              console.log(`User left room: ${currentRoom}`);
            }
            socket.emit("joinChat", bookingId);
            set({ currentRoom: bookingId });
            console.log(`User joined room: ${bookingId}`);
          } else {
            console.log(`User already in room: ${bookingId}`);
          }
        }
        return socket;
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
          socket.off("connect");
          socket.off("connect_error");
          socket.off("getOnlineUsers");
          socket.off("newMessage");
          socket.off("disconnect");
          socket.disconnect();
          set({ socket: null, currentRoom: null });
        }
      },

      initializeChat: async () => {
        const { joinRoom, selectedUser } = get();
        const { authUser } = userAuthStore.getState();

        if (!authUser) return () => {};

        if (selectedUser) await joinRoom(selectedUser.id);
        return () => {};
      },
    }),
    {
      name: "user-chat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedUser: state.selectedUser,
        messages: state.messages,
        messageCache: Object.fromEntries(state.messageCache),
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.messageCache) {
          state.messageCache = new Map(Object.entries(state.messageCache));
          console.log("Rehydrated messages:", state.messages);
        }
      },
    }
  )
);

const getBookingId = async (receiverId) => {
  const res = await axiosInstance.get(`/user/booking/chat/${receiverId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });
  return res.data.bookingId;
};
