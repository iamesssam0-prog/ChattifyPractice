import React, { useEffect } from 'react'
import avatar from "../assets/avatar.png";
import { useChatStore } from '../store/useChatStore';
import { XIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();

    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                setSelectedUser(null);
            }
        };

        // 1. لازم الـ Listener يكون بره الدالة عشان يراقب الكيبورد من أول ما الـ Component يفتح
        window.addEventListener("keydown", handleEscKey);

        // 2. الـ Cleanup مهم جداً عشان م يحصلش Memory Leak
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]); // 3. ضيف الـ Dependency Array هنا



    return (
        <div className='flex-1 max-h-[84px] bg-slate-800/80 px-12 py-3 flex justify-between 
        items-center
        '>
            {/* Left */}
            <div className='flex items-center gap-3'>
                <img src={selectedUser.profilePic ? selectedUser.profilePic :
                    avatar} alt=""
                    className=' w-12 h-12 rounded-full object-cover'
                />
                <span
                    className={`absolute 
                        left-20
                        top-16
                        md:top-15 md:left-100 w-3.5 h-3.5 rounded-full border-2 border-[#111827] 
                        ${onlineUsers.includes(selectedUser._id.toString())
                            ? "bg-green-500 shadow-[0_0_8px_#22c55e]" // أخضر منور
                            : "bg-gray-500" // رمادي للأوفلاين أشيك من الأحمر الفاقع
                        }`} >
                </span>
                <div>
                    <h2 className='font-semibold text-slate-200'>{selectedUser?.fullName}</h2>
                    <p className='text-sm text-slate-400'>

                        {
                            onlineUsers.includes(selectedUser._id.toString()) ?
                                "Online" : "Offline"
                        }

                    </p>
                </div>
            </div>

            {/* Right */}
            <div>
                <button
                    onClick={() => setSelectedUser(null)}
                >
                    <XIcon className='text-slate-400 cursor-pointer hover:text-slate-200' />
                </button>
            </div>
        </div >
    )
}

export default ChatHeader
