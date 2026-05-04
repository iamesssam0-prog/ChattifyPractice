import React from 'react'
import { useChatStore } from '../store/useChatStore'

const ActiveTabSwitch = () => {

    const { activeTab, setActiveTab } = useChatStore();


    return (
        <div className='flex justify-between items-center px-8 text-slate-400 mt-4'>

            {/* <div> */}
            <button
                className={`py-1 px-10 ${activeTab === "chats" ?
                    "  bg-cyan-700 rounded-lg text-slate-200 cursor-pointer"
                    : "cursor-pointer"
                    }`}
                onClick={() => setActiveTab("chats")}
            >Chats</button>
            {/* </div> */}


            {/* <div> */}
            <button
                className={`py-1 px-10 ${activeTab === "contacts" ?
                    "  bg-cyan-700 rounded-lg text-slate-200 cursor-pointer"
                    : "cursor-pointer"
                    }`}
                onClick={() => setActiveTab("contacts")}
            >Contacts</button>

        </div>
        // </div>
    )
}

export default ActiveTabSwitch
