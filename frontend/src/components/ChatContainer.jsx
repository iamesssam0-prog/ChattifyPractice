import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessageInput from './MessageInput';
import { DeleteIcon, FlipVertical, MoreVertical, Trash2 } from 'lucide-react';
// import {NoChat}
const ChatContainer = () => {

    const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,
        subscribeToMessages, unsubscribeFromMessages, deleteMessage
    } = useChatStore();

    const { authUser } = useAuthStore();

    const messageEndRef = useRef(null);
    // if(!isMessagesLoading) 

    const [openMenuId, setOpenMenuId] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);


    useEffect(() => {
        getMessagesByUserId(selectedUser._id);

        //listen to any incoming message
        subscribeToMessages();

        //cleanup 
        return () => unsubscribeFromMessages();
    }, [selectedUser, getMessagesByUserId,
        subscribeToMessages, unsubscribeFromMessages])


    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages]);



    return (
        <div className='flex flex-col h-full w-full min-w-0 bg-base-100'>
            {/* الـ Header هيفضل ثابت فوق */}
            <ChatHeader />

            {/* منطقة الرسائل مع تحسين الـ Padding */}
            <div className='flex-1 overflow-y-auto p-7 md:p-6 flex flex-col space-y-4
            custom-scrollbar
            mr-3
            '>
                {messages.length > 0 && !isMessagesLoading ? (
                    <div className='flex flex-col w-full max-w-4xl mx-auto'>
                        {messages.map((msg) => {
                            const isMe = msg.senderId === authUser._id;
                            return (
                                <div
                                    key={msg._id}
                                    className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-3`}
                                >
                                    {/* Wrapper الرسالة */}
                                    <div className={`relative max-w-[85%] md:max-w-[75%] min-w-0 flex flex-col ${isMe ? "items-end" : "items-start"}`}>

                                        {/* فقاعة الرسالة: w-fit عشان ما تفرشش عالفاضي */}
                                        <div className={`px-4 py-2 shadow-sm relative w-fit max-w-full
                                        ${isMe
                                                ? "bg-cyan-600 text-white rounded-2xl rounded-tr-none"
                                                : "bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none"}
                                    `}
                                            onClick={() => {
                                                if (isMe) {
                                                    if (window.confirm("Delete Message ? ")) {
                                                        deleteMessage(msg._id)
                                                    }
                                                }
                                            }}
                                        >
                                            {msg.image && (
                                                <img
                                                    src={msg.image}
                                                    alt="Attachment"
                                                    className='rounded-lg max-h-60 w-full object-cover mb-2 border border-white/10'
                                                />
                                            )}



                                            <p className='text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words [word-break:break-word]'>
                                                {msg.text}
                                            </p>

                                            {/* التوقيت تحت الكلام بشكل شيك */}
                                            <div className={`text-[10px] mt-1 opacity-50 flex items-center gap-1 ${isMe ? "justify-end" : "justify-start"}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {isMe && <span>✓</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messageEndRef} />
                    </div>
                ) : isMessagesLoading ? (
                    <MessagesLoadingSkeleton />
                ) : (
                    <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
                )}
            </div>

            {/* Input الرسائل */}
            <div className="p-4 bg-base-100 border-t border-base-300">
                <MessageInput />
            </div>
        </div>
    );
}

export default ChatContainer