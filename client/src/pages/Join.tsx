import { Button } from "../components/ui/button"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input } from "../components/ui/input";


const Join = () => {
    const navigator = useNavigate()
    const [meetingId, setMeetingId] = useState('')
    const handleJoin = () => {
        if (meetingId === '') return
        navigator(`/meeting/${meetingId}`)
    }
    return (
        <div className='flex flex-col justify-center items-center my-20'>
            <div className=' max-w-96'>
                <h2 className='font-bold text-2xl text-slate-700'>Join a Meeting</h2>
                <div className='flex gap-4 flex-col mt-2'>
                    <hr></hr>
                    <form className='flex flex-col gap-4 w-96 max-sm:w-72' >
                        <Input type="text" placeholder="Meeting Id" required name='id' value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
                        <Button onClick={handleJoin} className="p-2">Join</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join