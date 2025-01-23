import React, { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client';

import { Avatar, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { MessageCircle, SendHorizontal } from 'lucide-react'
import { Button } from '../ui/button'

type Message = {
    message: string;
    username: string;
    image: string,
    sent: boolean,
    __createdtime__: number;
}
// dd/mm/yyyy, hh:mm:ss
type FormatDateFromTimestamp = {
    (timestamp: number): string;
}
type Props = {
    socketIo: React.MutableRefObject<Socket | null>
    id: string
}

const Chat = ({ socketIo, id }: Props) => {
    const [message, setMessage] = useState('');
    const [messagesRecieved, setMessagesReceived] = useState<Message[]>([]);

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
    useEffect(() => {
        const joinRoom = () => {
            if (id !== '') {
                socketIo.current?.emit('join_room', { username: user?.data?.name, roomId: id });
            }
        };
        joinRoom()
    }, [id, user, socketIo])


    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        const socket = socketIo.current;
        socket?.on('receive_message', (data: Message) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                    image: data.image,
                    sent: data.sent
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => {
            socket?.off('receive_message');
        };
    }, [socketIo]);



    const formatDateFromTimestamp: FormatDateFromTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    const sendMessage = () => {
        if (message !== '') {
            const __createdtime__ = Date.now();
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socketIo.current?.emit('send_message', { username: user.data.name, image: user.data.image, roomId: id, message, __createdtime__, sent: true });
            setMessage('');
        }
    };
    const ref = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messagesRecieved, messagesRecieved.length, message]);
    return (
        <div className=' flex flex-col h-[85%]' ref={ref}>
            <div className="flex justify-between items-center mb-4 bg-blue-400 text-white p-4 rounded-lg ">
                <h2 className="font-semibold">Chat</h2>
                <MessageCircle className="w-5 h-5" />
            </div>

            <ScrollArea className="flex-1 -mx-4 px-4" >
                <div className="space-y-4 h-[3/4] overflow-auto" ref={ref}>
                    {messagesRecieved?.filter((obj, index, self) => index === self.findIndex((t) => t["message"] === obj["message"] && t["username"] === obj["username"] && t["__createdtime__"] === obj["__createdtime__"]))?.map((message, i) => (
                        <div key={i} className='flex flex-col  w-full'>
                            <div
                                className={`flex gap-2 ${user?.data?.name == message?.username ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={message.image ? message.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} />
                                    {/* <AvatarFallback>{message.user.initials}</AvatarFallback> */}
                                </Avatar>
                                <div className={`rounded-lg p-2 max-w-[80%] ${user?.data?.name == message?.username
                                    ? "bg-blue-400 text-white"
                                    : "bg-gray-100 text-gray-900"
                                    }`}>
                                    {message.message}
                                </div>
                            </div>
                            <div
                                className={`rounded-lg text-sm  text-zinc-500 ${user?.data?.name == message?.username ? "text-right" : "text-left"}`}
                            >
                                {formatDateFromTimestamp(message.__createdtime__)}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-4 flex gap-2">
                <Input
                    placeholder="Type a message..."
                    className="w-full"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <Button className="" onClick={sendMessage}><SendHorizontal /></Button>
            </div>
        </div>
    )
}

export default Chat