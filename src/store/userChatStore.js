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
          console.log("Fetched users:", res.data);
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
        const { messageCache } = get();
        set({ isMessagesLoading: true });
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
          console.log(
            "Fetched messages for driver:",
            driverId,
            "Data:",
            res.data
          );
          set({ messages: res.data, isMessagesLoading: false });
          messageCache.set(driverId, res.data);
          return res.data;
        } catch (error) {
          const errorMsg =
            error.response?.data?.error || "Failed to load messages";
          toast.error(errorMsg);
          console.error("Error in getMessages for driver:", driverId, error);
          set({ messages: [], isMessagesLoading: false });
          return null;
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
            console.log("Socket not connected, connecting...");
            await joinRoom(selectedUser.id);
          }

          const bookingId = await getBookingId(selectedUser.id);
          await joinRoom(selectedUser.id);

          const tempMessage = {
            id: `temp-${Date.now()}`,
            senderUserId: authUser.id,
            receiverDriverId: selectedUser.id,
            text,
            image,
            createdAt: new Date().toISOString(),
            bookingId,
          };
          set((state) => {
            const updatedMessages = [...state.messages, tempMessage];
            if (selectedUser)
              messageCache.set(selectedUser.id, updatedMessages);
            console.log("Optimistically added message:", tempMessage);
            return { messages: updatedMessages };
          });

          socket.emit("sendMessage", {
            senderId: authUser.id,
            receiverId: selectedUser.id,
            text,
            image,
            recipientType: "driver",
            role: "user",
            bookingId,
          });
        } catch (error) {
          console.error("Error in sendMessage:", error);
          toast.error(error.response?.data?.error || "Failed to send message");
          set((state) => ({
            messages: state.messages.filter((msg) =>
              String(msg.id).startsWith("temp-")
            ),
          }));
        }
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

        if (socket) socket.disconnect();

        socket = io(BASE_URL, {
          query: { userId: authUser.id },
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
        });

        socket.on("connect", async () => {
          console.log("User socket connected:", socket.id);
          set({ socket });

          const users = await get().getUsers();
          if (users && users.length > 0) {
            for (const user of users) {
              await get().joinRoom(user.id);
            }
          }

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
          console.log("Online users updated:", userIds);
        });

        socket.on("disconnect", () => {
          console.log("User socket disconnected");
          set({ currentRoom: null });
        });

        socket.on("reconnect", async () => {
          console.log("User socket reconnected:", socket.id);
          const users = await get().getUsers();
          if (users && users.length > 0) {
            for (const user of users) {
              await get().joinRoom(user.id);
            }
          }
          const { selectedUser } = get();
          if (selectedUser?.id) {
            await get().joinRoom(selectedUser.id);
            await get().getMessages(selectedUser.id);
          }
        });

        socket.on("newMessage", async (message) => {
          const { messages, selectedUser, messageCache, currentRoom } = get();
          const authUser = userAuthStore.getState().authUser;
          if (!authUser || !message.id) return;

          console.log(
            "Received newMessage event:",
            message,
            "Current room:",
            currentRoom
          );

          const isReceiver =
            message.receiverUserId === authUser.id ||
            message.senderUserId === authUser.id;
          if (!isReceiver) {
            console.log("Message not relevant to this user:", authUser.id);
            return;
          }

          if (message.bookingId !== currentRoom) {
            console.log("Room mismatch, joining room:", message.bookingId);
            const otherUserId =
              message.senderDriverId || message.receiverDriverId;
            await get().joinRoom(otherUserId);
          }

          set((state) => {
            const updatedMessages = state.messages.some(
              (msg) =>
                String(msg.id).startsWith("temp-") &&
                msg.bookingId === message.bookingId
            )
              ? state.messages.map((msg) =>
                  String(msg.id).startsWith("temp-") &&
                  msg.bookingId === message.bookingId
                    ? message
                    : msg
                )
              : [
                  ...state.messages.filter((msg) => msg.id !== message.id),
                  message,
                ];

            if (
              selectedUser &&
              (message.senderDriverId === selectedUser.id ||
                message.receiverDriverId === selectedUser.id)
            ) {
              messageCache.set(selectedUser.id, updatedMessages);
              console.log(
                "Updated messages for selected user:",
                updatedMessages
              );
              return {
                messages: updatedMessages,
                currentRoom: message.bookingId,
              };
            } else {
              console.log(
                "Message cached but not displayed - no matching selectedUser"
              );
              const otherUserId =
                message.senderDriverId || message.receiverDriverId;
              messageCache.set(otherUserId, updatedMessages);
              return { currentRoom: message.bookingId };
            }
          });
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

          if (bookingId && currentRoom !== bookingId) {
            socket.emit("joinChat", bookingId);
            set({ currentRoom: bookingId });
            console.log(`User joined room: ${bookingId}`);
          } else {
            console.log(`User already in room or no bookingId: ${bookingId}`);
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
  try {
    const res = await axiosInstance.get(`/messages-user/booking/chat/${receiverId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    console.log(`Booking ID for receiver ${receiverId}:`, res.data.bookingId);
    if (!res.data.bookingId) throw new Error("No booking ID returned");
    return res.data.bookingId;
  } catch (error) {
    console.error("Error fetching booking ID:", error);
    toast.error("Failed to fetch chat room ID");
    return null;

  }
};
