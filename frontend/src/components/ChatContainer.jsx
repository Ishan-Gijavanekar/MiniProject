import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from "../store/authStore"
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoading, selectedUser, subcribeToMessages, unSubscribeFromMessages} = useChatStore()
  const {userAuth} = useAuthStore()
  const MessageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)

    subcribeToMessages()

    return () => unSubscribeFromMessages()
  }, [selectedUser._id, getMessages, subcribeToMessages, unSubscribeFromMessages])

  useEffect(() => {
    if(MessageEndRef.current && messages){
    MessageEndRef.current.scrollIntoView({behaviour:"smooth"})
  }
  }, [messages])

  if(isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <MessageSkeleton />

      <MessageInput />
    </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message._id}
            className={`chat ${message.senderId === userAuth._id ? "chat-end" : "chat-start"}`}
            ref={MessageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === userAuth._id ? userAuth.profilePic || "/defaultUser.jpg" : selectedUser.profilePic || "/defaultUser.jpg"} alt="Profile Pic" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img src={message.image} alt="Attachment"  className='sm:max-w-[200px] rounded-md mb-2'/>
              )}
              {message.text && (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer