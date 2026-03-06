import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamtoken } from '../lib/api';

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";



const ChatPage = () => {
  const {id:targetId}=useParams();
  console.log("Target ID:", targetId);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamtoken,
    enabled: !!authUser, // this will run only when authUser is available
  });
  console.log("Token Data:", tokenData);
  useEffect(() => {
    const initChat = async () => {
      console.log("Initializing chat client...");

      if (!authUser || !tokenData) return;
      try{
        console.log("Initializing chat client...");
        const client = StreamChat.getInstance("z3hsp375fcwc");
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullname,
            image: authUser.photoUrl,
          },
          tokenData.token
        );
        const chid=[targetId,authUser._id].sort().join("-");
        const channel = client.channel("messaging", chid, {
          members: [authUser._id, targetId],
        });
        await channel.watch();
        setChatClient(client);
        setChannel(channel);
        // setLoading(false);
      }
      catch(err){
        console.error("Error initializing chat client:", err);
        toast.error("Failed to initialize chat. Please try again later.");
        return;
      }
      finally{
        setLoading(false);
      }
    }
    initChat();
  },[tokenData,authUser,targetId]);
  console.log("Chat Client:", chatClient);
  if (loading || !chatClient || !channel) {
    return <div>Loading chat...</div>;
  }



  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
export default ChatPage
