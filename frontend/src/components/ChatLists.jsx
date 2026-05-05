import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

import avatar from "../assets/avatar.png";
import UsersLoadingSkeleton from './UsersLoadingSkeleton ';
import NoChatsFound from './NoChatsFound';
import { useAuthStore } from '../store/useAuthStore';
const ChatLists = () => {

    const { getMyChatPartners, chats,
        selectedUser, setSelectedUser, isUsersLoading
    } = useChatStore();

    const { onlineUsers } = useAuthStore();


    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);

    if (isUsersLoading) return <UsersLoadingSkeleton />
    if (chats.length === 0) return <NoChatsFound />

    console.log("selected User is", selectedUser);

    return (
        <div>

            {chats.map((chat) => (
                <div
                    key={chat._id}
                    className='relative flex items-center gap-3 mb-5 mt-3 bg-cyan-800/40 py-4 px-5 rounded-lg cursor-pointer hover:bg-cyan-800/80 duration-300 transition-all'
                    onClick={() => setSelectedUser(chat)}
                >
                    {/* الصورة والـ Indicator */}
                    <div className="relative">
                        <img
                            src={chat.profilePic ? chat.profilePic : avatar}
                            alt=""
                            className='object-cover w-12 h-12 rounded-full border-2 border-cyan-900/50'
                        />

                        {/* نقطة الحالة - Status Indicator */}
                        <span className={`absolute bottom-8 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#111827] ${onlineUsers.includes(chat._id.toString())
                            ? "bg-green-500 shadow-[0_0_8px_#22c55e]" // أخضر منور
                            : "bg-gray-500" // رمادي للأوفلاين أشيك من الأحمر الفاقع
                            }`} />
                    </div>

                    <h2 className='text-white font-medium'>{chat.fullName}</h2>

                    {/* لو عايز تستخدم الأحمر ده درجة تحفة: bg-[#ff4d4d] */}
                </div>
            ))}

        </div>
    )
}

export default ChatLists
