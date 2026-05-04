import React, { useEffect } from 'react'
import avatar from "../assets/avatar.png";
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ContactsList = () => {
    const { allContacts, setSelectedUser, getAllContacts } = useChatStore();

    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getAllContacts();
    }, [getAllContacts]);

    return (
        <div>
            {/* {allContacts.map((contact) => (
                <div key={contact._id} className='flex items-center gap-3
                    mb-5 mt-3 bg-cyan-800/40 py-4 px-5 rounded-lg cursor-pointer 
                    hover:bg-cyan-800/80 duration-300 transition-all 
                    '
                    onClick={() => setSelectedUser(contact)}
                >
                    <img src={contact.profilePic ? contact.profilePic : avatar} alt=""
                        className='object-cover w-12 h-12 rounded-full'
                    />
                    <h2 className='text-white'>{contact.fullName}</h2>
                </div>
            ))} */}

            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    className='relative flex items-center gap-3 mb-5 mt-3 bg-cyan-800/40 py-4 px-5 rounded-lg cursor-pointer hover:bg-cyan-800/80 duration-300 transition-all'
                    onClick={() => setSelectedUser(contact)}
                >
                    {/* الصورة والـ Indicator */}
                    <div className="relative">
                        <img
                            src={contact.profilePic ? contact.profilePic : avatar}
                            alt=""
                            className='object-cover w-12 h-12 rounded-full border-2 border-cyan-900/50'
                        />

                        {/* نقطة الحالة - Status Indicator */}
                        <span className={`absolute bottom-8 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#111827] 
                        ${onlineUsers.includes(contact._id.toString())
                                ? "bg-green-500 shadow-[0_0_8px_#22c55e]" // أخضر منور
                                : "bg-gray-500" // رمادي للأوفلاين أشيك من الأحمر الفاقع
                            }`} />
                    </div>

                    <h2 className='text-white font-medium'>{contact.fullName}</h2>

                    {/* لو عايز تستخدم الأحمر ده درجة تحفة: bg-[#ff4d4d] */}
                </div>
            ))}
        </div>
    )
}

export default ContactsList
