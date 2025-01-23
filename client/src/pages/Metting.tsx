/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Mic, Video, MonitorUp, Users, MoreVertical, Phone, MicOff, VideoOff } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Chat from "../components/metting/Chat"

type Props = {
    socketIo: React.MutableRefObject<Socket | null>
}


import { Socket } from "socket.io-client";
import Loader from "../components/features/Skeleton"

// eslint-disable-next-line @typescript-eslint/no-explicit-any


export default function VideoConference({ socketIo }: Props) {
    const currentSocket = socketIo?.current
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
    const [loading, setLoading] = useState(false)
    const [isCallStarted, setIsCallStarted] = useState(false)

    const [audioFlag, setAudioFlag] = useState(true);
    const [videoFlag, setVideoFlag] = useState(true);
    const userVideo = useRef<HTMLVideoElement>(null);

    const myVideo = useRef<HTMLVideoElement>(null)

    const [userUpdate, setUserUpdate] = useState([{ id: '', username: '', roomId: '' }]);
    const { id } = useParams<{ id: string }>()



    useEffect(() => {
        const startCall = () => {
            setLoading(true)
            navigator.mediaDevices
                .getUserMedia({ video: videoFlag, audio: audioFlag })
                .then((stream) => {


                    if (myVideo.current) {
                        myVideo.current.srcObject = stream;
                        setIsCallStarted(true)
                        setLoading(false)
                    }
                    currentSocket?.emit('join_room', { username: user?.data?.name, roomId: id });
                })

            setLoading(false)
        }
        startCall()
    }, [videoFlag, audioFlag, currentSocket, id, user?.data?.name])


    // useEffect(() => {
    //     startCall();
    // }, []);
    useEffect(() => {
        currentSocket?.on('chatroom_users', (users: { id: string, username: string, roomId: string }[]) => {
            setUserUpdate(users);
            // console.log(users);
        })
    }, [currentSocket])
    const endCall = () => {
        console.log('end call');

    }
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-16 bg-gray-50 border-r flex flex-col items-center py-4 gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            </div>

            {/* Main content */}
            <div className="flex-1 flex max-md:block">
                {/* Video area */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold flex ">

                            <span className="text-lg bg-slate-100 text-zinc-900 rounded-lg p-2 shadow-md">
                                Share Meeting Id :{id}
                            </span>

                        </h1>
                        <Button variant="outline" >
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    Participants
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Users</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {
                                        userUpdate?.filter((obj, index, self) => index === self.findIndex((t) => t["username"] === obj["username"] && t['id'] === obj['id']))?.map((user) => (
                                            <DropdownMenuItem key={user.id} className='border-black p-2 mb-2'>{user.username}</DropdownMenuItem>
                                        ))
                                    }


                                </DropdownMenuContent>
                            </DropdownMenu>

                        </Button>
                    </div>
                    {
                        loading ? <Loader /> : (
                            <>
                                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <Card key={i}>
                                            <CardContent className="p-0">
                                                <video playsInline ref={userVideo} autoPlay
                                                />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <Card className="mt-4  w-full h-full">
                                    <CardContent className="p-0 relative w-full h-[55%]">
                                        <video
                                            ref={myVideo}
                                            autoPlay
                                            playsInline
                                            muted // كتم الصوت المحلي لمنع التغذية الراجعة
                                            className="w-full h-full bg-gray-200"
                                        />
                                        <div className="absolute bottom-4 left-4 flex gap-2">
                                            <Button variant="secondary" size="sm" onClick={() => setAudioFlag(!audioFlag)}>
                                                {
                                                    audioFlag ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />
                                                }

                                            </Button>
                                            <Button variant="secondary" size="sm" onClick={() => setVideoFlag(!videoFlag)}>
                                                {
                                                    videoFlag ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />
                                                }

                                            </Button>
                                            <Button variant="secondary" size="sm">
                                                <MonitorUp className="w-4 h-4" />
                                            </Button>
                                            <Button variant="secondary" size="sm">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            {!isCallStarted ? (
                                                <Button >Start Call</Button>
                                            ) : (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className=""
                                                    onClick={endCall}
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    End Call
                                                </Button>
                                            )}
                                        </div>

                                    </CardContent>
                                </Card>
                            </>
                        )
                    }


                </div>

                {/* Chat sidebar */}
                <div className="w-80 border-l p-4 flex flex-col max-md:w-full h-full">
                    <Chat socketIo={socketIo} id={id || ''} />
                </div>
            </div>
        </div>
    )
}

