import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningIn: false,
    isLogingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:4000/api/users/userProfile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            set({ authUser: res.data });
            get().connectSocket();

        } catch (error) {
            console.log("Error in authCheck:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningIn: true })

        try {
            const res = await axios.post("http://localhost:4000/api/users/register", data);
            localStorage.setItem("token", res.data.token);
            set({ authUser: res.data.user });
            const { user } = res.data;
            toast.success(`Welcome ${user.fullName} to our chat app 👋🏻`);

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningIn: false })
        }
    },

    login: async (data) => {
        set({ isLogingIn: true })
        try {
            const res = await axios.post("http://localhost:4000/api/users/login",
                data
            );
            localStorage.setItem("token", res.data.token);
            set({ authUser: res.data.user });
            const { user } = res.data;
            toast.success(`Welcome back  ${user.fullName} 👋🏻`);

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLogingIn: false })
        }
    },

    logout: () => {
        try {
            localStorage.removeItem("token");
            set({ authUser: null });
            toast.success("Logged out successfully ✅");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    },

    updateProfile: async (image) => {
        try {
            const res = await axios.post("http://localhost:4000/api/users/updateProfile",
                image
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            // set({ authUser: res.data });
            set((state) => ({
                authUser: { ...state.authUser, ...res.data }
            }));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    // connectSocket: () => {
    //     const { authUser } = get();
    //     if (!authUser || get().socket?.connected) return;

    //     const socket = io("http://localhost:4000", { withCredentials: true });

    //     socket.connect();

    //     set({ socket: socket });

    //     //listen for the online users event
    //     socket.on("getOnlineUsers", (userIds) => {
    //         set({ onlineUsers: userIds });
    //     })
    // },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        // بنجيب التوكن من الـ localStorage
        const token = localStorage.getItem("token");

        const socket = io("http://localhost:4000", {
            auth: {
                token: token // ده اللي الـ Middleware بتاعك مستنيه
            },
            withCredentials: true
        });

        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}))




