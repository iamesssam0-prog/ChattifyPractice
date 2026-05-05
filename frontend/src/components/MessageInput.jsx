import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { toast } from 'sonner';
import { ImageIcon, SendIcon, XIcon } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(false);

    const fileInputRef = useRef();

    const { sendMessages } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !image) return;

        const formData = new FormData();
        formData.append('text', text.trim());
        if (image) formData.append('image', image); // بنضيف الملف الخام (file object)

        sendMessages(formData); // ابعت الـ formData كاملة

        setText("");
        setImagePreview(null);
        setImage(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select and image file");
            return;
        }
        setImage(file);
        // setImagePreview(file);

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    }




    const removeImage = () => {
        // setImage(null);
        // if (fileInputRef.current) fileInputRef.current.value = "";
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    return (
        <div className='p-2 md:p-4 border-t border-slate-700/50 bg-base-100'>
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center px-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 cursor-pointer"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='max-w-4xl mx-auto flex items-center gap-1 md:gap-2'>
                {/* منطقة الإدخال مع زرار الصورة جواها عشان نوفر مساحة بالعرض */}
                <div className='flex-1 relative flex items-center'>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='w-full bg-slate-800/40 border border-slate-700/50 rounded-xl py-2.5 md:py-3 pl-4 pr-10
                    placeholder:text-slate-500 text-sm md:text-base text-slate-200 font-medium focus:outline-none focus:border-cyan-500/50'
                        placeholder='Type a message...'
                    />

                    {/* زرار الصورة "مغروس" جوه الـ Input على اليمين */}
                    <button
                        type='button'
                        onClick={() => fileInputRef.current?.click()}
                        className={`absolute right-2 p-1.5 rounded-lg transition-colors 
                        ${image ? "text-cyan-500 bg-cyan-500/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"}
                        !cursor-pointer`}
                    >
                        <ImageIcon className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                <input
                    type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className='hidden'
                />

                {/* زرار الإرسال: متوازن في الموبايل وكبير في اللاب توب */}
                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className={`
                    shrink-0 flex items-center justify-center rounded-xl transition-all duration-200
                    /* في الموبايل w-10 وفي اللاب w-12 */
                    w-10 h-10 md:w-12 md:h-12
                    bg-gradient-to-r from-cyan-500 to-cyan-600 text-white
                    shadow-lg shadow-cyan-900/20
                    hover:from-cyan-600 hover:to-cyan-700 
                    active:scale-90
                    disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed
                    !cursor-pointer
                `}
                >
                    <SendIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
