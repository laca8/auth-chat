import { Button } from "../components/ui/button"

import { useNavigate } from 'react-router-dom';


function Hero() {
    const navigator = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center my-20'>
            <div className='text-center max-w-3xl'>
                <h2 className='font-bold text-[60px] text-slate-700'>Easy scheduling ahead</h2>
                <h2 className='text-xl mt-5 text-slate-500'>Scheduly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.</h2>
                <div className='flex gap-4 flex-col mt-5'>
                    <hr></hr>
                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-4">
                        <Button onClick={() => navigator('/host')} className="p-2">Host a Meeting</Button>
                        <Button onClick={() => navigator('/join')} className="p-2">Join a Meeting</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Hero