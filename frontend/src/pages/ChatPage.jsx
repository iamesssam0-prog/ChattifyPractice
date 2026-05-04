import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import { useChatStore } from '../store/useChatStore';
import ChatLists from '../components/ChatLists';
import ContactsList from '../components/ContactsList';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import ChatContainer from '../components/ChatContainer';

const ChatPage = () => {
    const { logout } = useAuthStore();

    const { activeTab, selectedUser } = useChatStore();

    useEffect(() => {
        // أول ما الصفحة تفتح يمنع الـ scroll في الـ body تماماً
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';

        return () => {

            document.body.style.overflow = 'auto';
            document.body.style.touchAction = 'auto';
        };
    }, []);

    {/* ChatPage */ }
    return (
        // <div className='relative flex w-full max-w-6xl h-[800px] shadow-xl'>
        <div className='relative flex w-full max-w-6xl h-screen md:h-[800px] shadow-xl
        overflow-hidden py-10  
        '>

            {/* Left section */}
            {/* <div className='w-80 flex flex-col bg-slate-800/50'> */}
            <div className={`${selectedUser ? "hidden" : "flex"}
             md:w-80 md:flex flex-col bg-slate-800/50 w-full`}>
                {/* Profile Header  */}
                <ProfileHeader />
                {/* Active Tab switch */}
                <ActiveTabSwitch />

                <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                    {activeTab === "chats" ?
                        <ChatLists /> :
                        <ContactsList />
                    }
                </div>
            </div>

            {/* Right Section */}
            {/* <div className={`flex-1 w-full hidden md:flex flex-col bg-slate-900/50
                ${selectedUser ? "" : ""}
                `}> */}
            <div className={`flex-1 flex-col bg-slate-900/50
                ${selectedUser ? "flex" : "hidden"}
                md:flex`}>
                {selectedUser ?
                    <ChatContainer />
                    :
                    <NoConversationPlaceholder />
                }
            </div>
            {/* <button onClick={logout} className='cursor-pointer'>Logout</button> */}
        </div>
    )
}

export default ChatPage
