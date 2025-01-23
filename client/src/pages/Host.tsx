import { Button } from "../components/ui/button"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Share, SquarePlus, Video } from "lucide-react";
import { Card } from "../components/ui/card";
import { v1 as uuid } from "uuid";

const Host = () => {
    const currentdate = new Date();
    const [datetime, setDatetime] = useState('')

    setTimeout(() => {
        setDatetime(currentdate.toLocaleString('en-US', { weekday: 'long', month: 'long' }) + ' ' +
            currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes()
            + ":" + currentdate.getSeconds())
    }, 1000);
    const navigator = useNavigate()
    const createRoom = () => {
        const id = uuid();
        navigator(`/meeting/${id}`);
    }
    return (
        <div className='flex flex-col  my-20 max-w-4xl  mx-auto'>

            <h2 className='font-bold text-2xl text-slate-700 mb-5'>Host a Meeting</h2>


            <div className="grid grid-cols-2   gap-4 max-md:grid-cols-1 max-md:gap-4 w-full">
                <div className='flex gap-4 flex-col mt-2'>
                    <div >
                        <div className="grid grid-cols-2 gap-x-5 gap-y-5  max-md:grid-cols-1 max-md:gap-4 w-full">

                            <Video size={48} className=" w-full bg-green-400 text-2xl font-semibold text-white rounded-lg shadow-md h-24 p-4" />
                            <CalendarCheck size={48} className=" w-full bg-blue-400 text-2xl font-semibold text-white rounded-lg shadow-md  h-24 p-4" />
                            <Share size={48} className=" w-full bg-orange-400 text-2xl font-semibold text-white rounded-lg shadow-md h-24 p-4 " />
                            <SquarePlus size={48} className=" w-full bg-amber-400 text-2xl font-semibold text-white rounded-lg shadow-md h-24 p-4 " />
                        </div>
                        <Button className='w-full mt-5' onClick={createRoom}>
                            Host
                        </Button>
                    </div>
                </div>
                <Card className="flex flex-col shadow-md rounded-lg">
                    <img src="https://img.freepik.com/premium-photo/blue-background-with-flowers-place-text_192217-1194.jpg?w=320" className="h-48 rounded-t-lg" />
                    <div className=" p-4">
                        <h2 className='font-bold  text-slate-700'>Easy scheduling ahead</h2>
                        <p className="text-zinc-600 font-semibold">{datetime}</p>
                    </div>

                </Card>
            </div>

        </div>
    )
}

export default Host