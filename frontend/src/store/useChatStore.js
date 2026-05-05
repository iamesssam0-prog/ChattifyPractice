import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (user) => set({ selectedUser: user, messages: [] }),
    setActiveTab: (tab) => set({ activeTab: tab }),

    getAllContacts: async () => {
        try {
            const res = await axios.get("https://chattifypractice-backend.onrender.com/api/messages/contacts",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    //هنجيب الناس اللي المستخدم اللي سجل دخول عمل معاهم شات 
    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axios.get("https://chattifypractice-backend.onrender.com/api/messages/chats",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axios.get(`https://chattifypractice-backend.onrender.com/api/messages/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            set({ messages: res.data });
        } catch (error) {
            // toast.error(error.response?.data?.message || error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;


        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString()
        };

        //immidetaly update the ui by adding the message 
        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axios.post(`https://chattifypractice-backend.onrender.com/api/messages/send/${selectedUser._id}`,
                messageData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/formData"
                    }
                }
            );
            set({ messages: messages.concat(res.data) });
        } catch (error) {
            set({ messages: messages });
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    },

    //subscribe to message(hear any incoming messages)
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        //this our socket connection
        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessagesSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessagesSentFromSelectedUser) return;

            const currentMessage = get().messages;
            set({ messages: [...currentMessage, newMessage] });
        })



        //for deleting message
        socket.on("messageDeleted", (deletedMessageId) => {
            set({
                messages: get().messages.filter((msg) => msg._id !== deletedMessageId),
            })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("messageDeleted");
    },

    deleteMessage: async (messageId) => {
        const { messages, selectedUser } = get();

        set({
            messages: messages.filter((msg) => msg._id !== messageId)
        })

        try {

            const res = await axios.delete("https://chattifypractice-backend.onrender.com/api/messages/deleteMessage", {

                data: { messageId, selectedUser: selectedUser._id },

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success("Message deleted");
            // set({ messages: messages.concat(res.data) });
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        }
    }
}))

